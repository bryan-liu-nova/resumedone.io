import React, { PureComponent } from 'react';
import styled, { css } from 'styled-components';
import { SearchBox } from '/imports/core/ui/atoms';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { Editor, EditorState, ContentState, convertToRaw, convertFromRaw, RichUtils, CompositeDecorator, Modifier, ContentBlock, genKey, getDefaultKeyBinding  } from 'draft-js';
import '../../../../node_modules/draft-js/dist/Draft.css';

import theme from '/imports/core/ui/theme';

const INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Linethrough', style: 'LINETHROUGH'}
];

const BLOCK_TYPES = [
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'UL', style: 'unordered-list-item'}
];

const styleMap = {
  'LINETHROUGH': {
    textDecoration: 'line-through'
  }
};

class HandleTip extends PureComponent {
  static propTypes = {
    selectText: PropTypes.func.isRequired,
    offsetKey: PropTypes.string.isRequired,
  };

  state = {
    blue: true,
  };

  handleClick = () => {
    if (!this.state.blue) {
      return;
    }
    this.setState({ blue: false });
    this.props.selectText();
  };

  render() {
    const style = this.state.blue && { color: theme.colors.primary, cursor: 'pointer' } || {};
    return <span onClick={this.handleClick} style={style}>{this.props.children}</span>;
  }
}

class TextAreaEditor extends PureComponent {
  constructor(props) {
    super(props);

    let { defaultValue: value } = this.props;
    let editorState, content;

    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      },
      {
        strategy: findTipEntities,
        component: (props) => <HandleTip {...props} selectText={this.selectTip} />,
      },
    ]);

    if(!value || value === '') {
      editorState = EditorState.createEmpty(decorator);
    } else {
      try {
        content = convertFromRaw(JSON.parse(value));
        editorState = EditorState.createWithContent(content, decorator);
      } catch (error) {
        editorState = EditorState.createWithContent(ContentState.createFromText(value, decorator));
      }
    }

    this.state = {
      editorState,
      focused: false,
      linksSelected: false,
      textSelected: false,
      unchanged: [],
    };
  }

  _editor = null;

  onChangeDebounced = debounce(key => {
    if (this.state.unchanged.includes(key)) {
      this.setState(st => ({ unchanged: st.unchanged.filter(u => u !== key) }));
    }
  }, 500);

  selectTip = () => {
    const { editorState } = this.state;
    const contentState = this.state.editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const archorKey = selectionState.getAnchorKey();
    const anchorOffset = selectionState.getAnchorOffset();
    const block = contentState.getBlockForKey(archorKey);
    if(block) {
      const text = block.getText();
      const str1 = text.substring(0, anchorOffset);
      const str2 = text.substring(anchorOffset, text.length);
      const start = str1.lastIndexOf('[');
      const end = str1.length + str2.indexOf(']') + 1;
      const selection = {
        anchorKey: archorKey,
        anchorOffset: start,
        focusKey: archorKey,
        focusOffset: end,
        isBackward: false,
        hasFocus: false,
      };
      const newSelectionState = selectionState.merge(selection);
      const newEditorState = EditorState.forceSelection(
        editorState,
        newSelectionState
      );
      this.setState({ editorState: newEditorState });
    }
  };

  selectText = (selection) => {
    const { editorState } = this.state;
    const selectionState = editorState.getSelection();
    const newSelectionState = selectionState.merge(selection);
    const newEditorState = EditorState.forceSelection(
      editorState,
      newSelectionState
    );
    this.setState({ editorState: newEditorState });
  };

  onChange = editorState => {
    if(this.state.editorState !== editorState) {
      const selectionState = editorState.getSelection();
      const anchorKey = selectionState.getAnchorKey();
      const currentContent = editorState.getCurrentContent();
      const currentContentBlock = currentContent.getBlockForKey(anchorKey);
      const start = selectionState.getStartOffset();
      const end = selectionState.getEndOffset();
      const selectedText = currentContentBlock.getText().slice(start, end);

      const links = this.getEntities(editorState, 'LINK');

      let linksSelected = false;
      let textSelected = selectedText && selectedText !== '';

      links.forEach(link => {
        if(link.blockKey === anchorKey) {
          linksSelected = true;
        }
      });

      if(this.state.editorState.getCurrentContent() !== editorState.getCurrentContent()) {
        const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        this.props.onChange({ target: { value: content } });
        this.onChangeDebounced(anchorKey);
      }

      this.setState({ editorState, linksSelected, textSelected });
    }
  };

  handleKeyCommand = command => {
    const { editorState } = this.state;
    if(command === 'split-block') {
      const selectionState = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      const anchorKey = selectionState.getAnchorKey();
      const block = contentState.getBlockForKey(anchorKey);
      if(block.getText() === '' && (block.getType() === 'ordered-list-item' || block.getType() === 'unordered-list-item')) {
        this.toggleBlockType('unstyled');
        return true;
      }
    }
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  };

  onTab = e => {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  };

  toggleBlockType = blockType => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  };

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  };

  getEntities = (editorState, entityType = null) => {
    const content = editorState.getCurrentContent();
    const entities = [];
    content.getBlocksAsArray().forEach((block) => {
      let selectedEntity = null;
      block.findEntityRanges(
        (character) => {
          if (character.getEntity() !== null) {
            const entity = content.getEntity(character.getEntity());
            if (!entityType || (entityType && entity.getType() === entityType)) {
              selectedEntity = {
                entityKey: character.getEntity(),
                blockKey: block.getKey(),
                entity: content.getEntity(character.getEntity()),
              };
              return true;
            }
          }
          return false;
        },
        (start, end) => {
          entities.push({ ...selectedEntity, start, end });
        });
    });
    return entities;
  };

  toggleLink = () => {
    if(this.state.linksSelected) {
      this.removeLink();
    } else {
      this.addLink();
    }
  };

  addLink = () => {
    const url = prompt('Please inter url');
    if(url !== null && url !== '') {
      const { editorState } = this.state;
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        {url: url}
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
      this.setState({
        editorState: RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        )
      });
    }
  };

  removeLink = () => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
  };

  onFocus = () => {
    this.setState({ focused: true });
  };

  onBlur = () => {
    this.setState({ focused: false });
  };

  getEditor = (node) => {
    this._editor = node;
  };

  addSuggestion = (text, key) => {
    const editorState = EditorState.moveSelectionToEnd(this.state.editorState);
    const contentState = editorState.getCurrentContent();
    const newBlock = new ContentBlock({
      key,
      type: this.props.suggestionBlockType || 'unordered-list-item',
      text,
    });
    const blockMap = contentState.getBlockMap();
    let newBlockMap = blockMap.toSeq().concat([[newBlock.getKey(), newBlock]]).toOrderedMap();
    if(newBlockMap.size === 2 && newBlockMap.first().text === '') {
      newBlockMap = newBlockMap.delete(newBlockMap.first().key);
    }
    let newContentState;
    newContentState = contentState.merge({
      blockMap: newBlockMap
    });
    let newEditorState = EditorState.push(editorState, newContentState, 'insert-fragment');
    newEditorState = EditorState.moveSelectionToEnd(newEditorState);
    this.setState(st => ({ editorState: newEditorState, unchanged: [...st.unchanged, key] }), () => {
      const content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
      this.props.onChange({ target: { value: content } });
      this._editor.focus();
    });
  };

  removeSuggestion = (text, key) => {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    const blockMap = contentState.getBlockMap();
    let newBlockMap = blockMap.delete(key);
    if(newBlockMap.size === 0) {
      const newBlock = new ContentBlock({
        key: genKey(),
        type: 'unstyled',
        text: '',
      });
      newBlockMap = newBlockMap.set(newBlock.getKey(), newBlock);
    }
    let newContentState;
    newContentState = contentState.merge({
      blockMap: newBlockMap
    });
    let newEditorState = EditorState.set(editorState, { currentContent: newContentState });
    newEditorState = EditorState.moveSelectionToEnd(newEditorState);
    this.setState(st => ({ editorState: newEditorState, unchanged: st.unchanged.filter(u => u !== key) }), () => {
      const content = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
      this.props.onChange({ target: { value: content } });
    });
  };

  onHelpSelect = (phrase, _id, selected) => {
    if(selected) {
      this.removeSuggestion(phrase, _id);
    } else {
      this.addSuggestion(phrase, _id);
    }
  };

  find = text => {
    const { blocks } = convertToRaw(this.state.editorState.getCurrentContent());
    return blocks && blocks.length && blocks.some(block => block.text === text && block.type === 'unordered-list-item');
  };

  getSelectedValues = values => {
    const blocks = this.state.editorState.getCurrentContent().getBlocksAsArray();
    let result = [];
    values.forEach(value => {
      blocks.forEach(block => {
        if(block.getText() === value && block.getType() === 'unordered-list-item') {
          result.push(value);
        }
      });
    });
    return result;
  };

  getCurrentPhrases = () => {
    const blocks = this.state.editorState.getCurrentContent().getBlocksAsArray();
    let result = [];
    blocks.forEach(block => {
      if(block.getText() !== '' && block.getType() === 'unordered-list-item') {
        result.push(block.getText());
      }
    });
    return result;
  };

  updateUnchanged = () => {
    const blocks = this.state.editorState.getCurrentContent().getBlocksAsArray();
    const { help } = this.props;
    let result = [];
    blocks.forEach(block => {
      if(block.getText() !== '' && block.getType() === 'unordered-list-item') {
        const index = help.findIndex(h => h._id === block.getKey());
        if(index !== -1) {
          result.push(help[index]._id);
        }
      }
    });
    this.setState(st => ({ unchanged: st.unchanged.concat(result) }));
  };

  render() {
    const { editorState, linksSelected, unchanged } = this.state;
    const { help, placeholder, area, areas, areasLoading, onDataChange, onDataSelect, simpleSearch, hideSearch, hideSearchBar, dataLoading, lastJob } = this.props;
    return (
      <Wrap onFocus={this.onFocus} onBlur={this.onBlur} hideSearch={hideSearch}>
        <LeftSide>
          <Editor
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            onTab={this.onTab}
            placeholder={placeholder}
            ref={this.getEditor}
          />
          <StyleControls
            editorState={editorState}
            toggleInlineStyle={this.toggleInlineStyle}
            toggleBlockType={this.toggleBlockType}
            toggleLink={this.toggleLink}
            linksSelected={linksSelected}
          />
        </LeftSide>
        {!hideSearch && <RightSide>
          <SearchBox
            data={help}
            onSelect={this.onHelpSelect}
            // selectedValues={this.getCurrentPhrases()}
            onDataChange={onDataChange}
            onDataSelect={onDataSelect}
            area={area}
            areas={areas}
            unchanged={unchanged}
            updateUnchanged={this.updateUnchanged}
            areasLoading={areasLoading}
            dataLoading={dataLoading}
            simpleSearch={simpleSearch}
            hideSearchBar={hideSearchBar}
            lastJob={lastJob}
          />
        </RightSide>}
        <Stripe active={this.state.focused} />
      </Wrap>
    );
  }
}

class StyleButton extends PureComponent {
  onToggle = e => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    return (
      <RichStyleButton active={this.props.active} onMouseDown={this.onToggle}>
        {textAreaIcons(this.props.style)}
      </RichStyleButton>
    );
  }
}

class LinkButton extends PureComponent {
  onToggle = e => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    const { linksSelected } = this.props;
    return (
      <RichStyleButton active={linksSelected} onMouseDown={this.onToggle}>
        { textAreaIcons(linksSelected ? 'LINK2' : 'LINK') }
      </RichStyleButton>
    );
  }
}

const StyleControls = (props) => {
  const { editorState, linksSelected, toggleLink } = props;
  const selection = editorState.getSelection();
  const block = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey());
  const blockType = block && block.getType();
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <RichControlls>
      <StyleButtonsGroup>
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.toggleInlineStyle}
            style={type.style}
          />
        )}
      </StyleButtonsGroup>
      <StyleButtonsGroup>
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.toggleBlockType}
            style={type.style}
          />
        )}
      </StyleButtonsGroup>
      <StyleButtonsGroup>
        <LinkButton
          linksSelected={linksSelected}
          onToggle={toggleLink}
          style={'LINK'}
        />
      </StyleButtonsGroup>
    </RichControlls>
  );
};

const textAreaIcons = icon => {
  let res = null;
  switch(icon) {
    case 'BOLD' : res = <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M8,17 L8,7 L11.7707948,7 C13.0770244,7 14.0677723,7.23236947 14.7430684,7.69711538 C15.4183644,8.1618613 15.7560074,8.84294423 15.7560074,9.74038462 C15.7560074,10.2303138 15.6204573,10.6618571 15.349353,11.0350275 C15.0782488,11.4081978 14.7011731,11.6817757 14.2181146,11.8557692 C14.7701814,11.983975 15.205174,12.242672 15.5231054,12.6318681 C15.8410367,13.0210642 16,13.4972499 16,14.0604396 C16,15.0219828 15.6697507,15.7499975 15.0092421,16.2445055 C14.3487336,16.7390135 13.4072766,16.9908424 12.1848429,17 L8,17 Z M10.2181146,12.6456044 L10.2181146,15.3447802 L12.1182994,15.3447802 C12.6407913,15.3447802 13.0486738,15.2291678 13.3419593,14.9979396 C13.6352448,14.7667113 13.7818854,14.4473464 13.7818854,14.0398352 C13.7818854,13.1240797 13.2717241,12.6593407 12.2513863,12.6456044 L10.2181146,12.6456044 Z M10.2181146,11.1895604 L11.8595194,11.1895604 C12.9784406,11.1712453 13.5378928,10.7568722 13.5378928,9.94642857 C13.5378928,9.4931296 13.3961813,9.1668966 13.1127542,8.96771978 C12.829327,8.76854296 12.3820117,8.66895604 11.7707948,8.66895604 L10.2181146,8.66895604 L10.2181146,11.1895604 Z"></path></svg>; break;
    case 'ITALIC' : res = <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M10.1737981,15.5714286 L11.5584135,8.42857143 L9.95714286,8.42857143 C9.7598983,8.42857143 9.6,8.26867312 9.6,8.07142857 L9.6,7.35714286 C9.6,7.1598983 9.7598983,7 9.95714286,7 L15.6428571,7 C15.8401017,7 16,7.1598983 16,7.35714286 L16,8.07142857 C16,8.26867312 15.8401017,8.42857143 15.6428571,8.42857143 L13.7330228,8.42857143 L12.3484075,15.5714286 L14.0428571,15.5714286 C14.2401017,15.5714286 14.4,15.7313269 14.4,15.9285714 L14.4,16.6428571 C14.4,16.8401017 14.2401017,17 14.0428571,17 L8.35714286,17 C8.1598983,17 8,16.8401017 8,16.6428571 L8,15.9285714 C8,15.7313269 8.1598983,15.5714286 8.35714286,15.5714286 L10.1737981,15.5714286 Z"></path></svg>; break;
    case 'UNDERLINE' : res = <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M16.3453125,7 L16.3453125,13.402819 C16.3453125,14.4666225 15.951127,15.3078604 15.1627441,15.9265579 C14.3743613,16.5452553 13.2972725,16.8545994 11.9314453,16.8545994 C10.586712,16.8545994 9.51885161,16.5541573 8.72783203,15.9532641 C7.93681245,15.3523709 7.53339852,14.5267115 7.51757812,13.4762611 L7.51757812,7 L9.890625,7 L9.890625,13.4161721 C9.890625,14.0526738 10.0712384,14.5166899 10.4324707,14.8082344 C10.793703,15.0997789 11.2933562,15.245549 11.9314453,15.245549 C13.2656317,15.245549 13.9432616,14.6535668 13.9643555,13.4695846 L13.9643555,7 L16.3453125,7 Z M7.87982196,17.4807122 L16.120178,17.4807122 C16.3299479,17.4807122 16.5,17.6507642 16.5,17.8605341 L16.5,18.620178 C16.5,18.8299479 16.3299479,19 16.120178,19 L7.87982196,19 C7.67005208,19 7.5,18.8299479 7.5,18.620178 L7.5,17.8605341 C7.5,17.6507642 7.67005208,17.4807122 7.87982196,17.4807122 Z"></path></svg>; break;
    case 'LINETHROUGH' : res = <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M8.218776,10.6611638 C7.9938233,10.2394416 7.88134766,9.77395634 7.88134766,9.26470588 C7.88134766,8.63368668 8.0527191,8.07085809 8.39546712,7.57620321 C8.73821515,7.08154833 9.23042485,6.69518856 9.872111,6.4171123 C10.5137972,6.13903604 11.2340726,6 12.032959,6 C12.8369995,6 13.5534094,6.15106801 14.1822103,6.45320856 C14.8110112,6.7553491 15.2993554,7.18181543 15.6472575,7.73262032 C15.9951596,8.28342521 16.1691081,8.90908741 16.1691081,9.60962567 L13.8497721,9.60962567 C13.8497721,9.07486364 13.6874202,8.65909239 13.3627116,8.36229947 C13.0380029,8.06550654 12.5818714,7.9171123 11.9943034,7.9171123 C11.4273518,7.9171123 10.9866823,8.04144261 10.6722819,8.29010695 C10.3578815,8.5387713 10.2006836,8.86630813 10.2006836,9.27272727 C10.2006836,9.65240832 10.3849401,9.97058695 10.7534587,10.2272727 C10.9695179,10.3777654 11.2453678,10.5227422 11.5810116,10.6622047 C10.7381999,10.6611638 9.35727946,10.6622047 8.218776,10.6611638 Z M13.842041,14.7754011 C13.842041,14.3208533 13.6874202,13.9719264 13.3781738,13.7286096 C13.2203718,13.6044501 12.9981534,13.4768105 12.7115165,13.3456897 C12.9823481,13.3439472 15.4837341,13.3456897 15.8720434,13.3439472 C16.0700871,13.7665751 16.1691081,14.2383774 16.1691081,14.7593583 C16.1691081,15.7700585 15.800595,16.5628314 15.0635579,17.1377005 C14.3265208,17.7125697 13.3343704,18 12.0870768,18 C11.2211871,18 10.4326207,17.8355631 9.72135417,17.5066845 C9.01008759,17.1778058 8.46762611,16.7272756 8.09395345,16.1550802 C7.72028079,15.5828848 7.53344727,14.9197899 7.53344727,14.1657754 L9.86051432,14.1657754 C9.86051432,15.4545519 10.6026944,16.0989305 12.0870768,16.0989305 C12.6385661,16.0989305 13.0689275,15.9826215 13.3781738,15.75 C13.6874202,15.5173785 13.842041,15.1925155 13.842041,14.7754011 Z M7.43231072,11.3549113 L16.5676893,11.3549113 C16.8064479,11.3549113 17,11.5484634 17,11.7872221 L17,12.2195328 C17,12.4582914 16.8064479,12.6518435 16.5676893,12.6518435 L7.43231072,12.6518435 C7.1935521,12.6518435 7,12.4582914 7,12.2195328 L7,11.7872221 C7,11.5484634 7.1935521,11.3549113 7.43231072,11.3549113 Z"></path></svg>; break;
    case 'ordered-list-item' : res = <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M9,6.2 L9,7.8 C9,7.91045695 9.08954305,8 9.2,8 L19.8,8 C19.9104569,8 20,7.91045695 20,7.8 L20,6.2 C20,6.08954305 19.9104569,6 19.8,6 L9.2,6 C9.08954305,6 9,6.08954305 9,6.2 Z M9.2,18 L19.8,18 C19.9104569,18 20,17.9104569 20,17.8 L20,16.2 C20,16.0895431 19.9104569,16 19.8,16 L9.2,16 C9.08954305,16 9,16.0895431 9,16.2 L9,17.8 C9,17.9104569 9.08954305,18 9.2,18 Z M9.2,13 C9.08954305,13 9,12.9104569 9,12.8 L9,11.2 C9,11.0895431 9.08954305,11 9.2,11 L19.8,11 C19.9104569,11 20,11.0895431 20,11.2 L20,12.8 C20,12.9104569 19.9104569,13 19.8,13 L9.2,13 Z M4,16 L4,15 L7,15 L7,19 L4,19 L4,18 L6,18 L6,17.5 L5,17.5 L5,16.5 L6,16.5 L6,16 L4,16 Z M5,9 L5,6 L4,6 L4,5 L6,5 L6,9 L5,9 Z M4,11 L4,10 L7,10 L7,10.9 L5.2,13 L7,13 L7,14 L4,14 L4,13.1 L5.8,11 L4,11 Z"></path></svg>; break;
    case 'unordered-list-item' : res = <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M9,6.7 L9,8.3 C9,8.41045695 9.08954305,8.5 9.2,8.5 L19.8,8.5 C19.9104569,8.5 20,8.41045695 20,8.3 L20,6.7 C20,6.58954305 19.9104569,6.5 19.8,6.5 L9.2,6.5 C9.08954305,6.5 9,6.58954305 9,6.7 Z M9.2,18.5 L19.8,18.5 C19.9104569,18.5 20,18.4104569 20,18.3 L20,16.7 C20,16.5895431 19.9104569,16.5 19.8,16.5 L9.2,16.5 C9.08954305,16.5 9,16.5895431 9,16.7 L9,18.3 C9,18.4104569 9.08954305,18.5 9.2,18.5 Z M9.2,13.5 C9.08954305,13.5 9,13.4104569 9,13.3 L9,11.7 C9,11.5895431 9.08954305,11.5 9.2,11.5 L19.8,11.5 C19.9104569,11.5 20,11.5895431 20,11.7 L20,13.3 C20,13.4104569 19.9104569,13.5 19.8,13.5 L9.2,13.5 Z M5.5,9 C4.67157288,9 4,8.32842712 4,7.5 C4,6.67157288 4.67157288,6 5.5,6 C6.32842712,6 7,6.67157288 7,7.5 C7,8.32842712 6.32842712,9 5.5,9 Z M5.5,14 C4.67157288,14 4,13.3284271 4,12.5 C4,11.6715729 4.67157288,11 5.5,11 C6.32842712,11 7,11.6715729 7,12.5 C7,13.3284271 6.32842712,14 5.5,14 Z M5.5,19 C4.67157288,19 4,18.3284271 4,17.5 C4,16.6715729 4.67157288,16 5.5,16 C6.32842712,16 7,16.6715729 7,17.5 C7,18.3284271 6.32842712,19 5.5,19 Z"></path></svg>; break;
    case 'LINK' : res = <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M16.2130943,7.78690569 C15.2823632,6.85617459 13.77335,6.85617459 12.8426189,7.78690569 L7.78690569,12.8426189 C6.85617459,13.77335 6.85617459,15.2823632 7.78690569,16.2130943 C8.71763678,17.1438254 10.22665,17.1438254 11.1573811,16.2130943 L16.2130943,11.1573811 C17.1438254,10.22665 17.1438254,8.71763678 16.2130943,7.78690569 Z M13.943728,15.6737311 L12.280873,17.3365861 C10.7296545,18.8878046 8.21463236,18.8878046 6.66341387,17.3365861 C5.11219538,15.7853676 5.11219538,13.2703455 6.66341387,11.719127 L8.32626889,10.056272 L9.45091165,11.1809148 L11.1361494,9.49567706 L10.0115066,8.3710343 L11.719127,6.66341387 C13.2703455,5.11219538 15.7853676,5.11219538 17.3365861,6.66341387 C18.8878046,8.21463236 18.8878046,10.7296545 17.3365861,12.280873 L15.6289657,13.9884934 L15.6301166,13.9896443 L13.9448789,15.6748821 L13.943728,15.6737311 Z M13.943728,15.6737311 L15.6289657,13.9884934 L14.5054739,12.8650016 L12.8202362,14.5502393 L13.943728,15.6737311 Z M13.9658723,10.0344648 C13.6556286,9.72422109 13.1526242,9.72422109 12.8423805,10.0344648 L10.033651,12.8431943 C9.72340725,13.153438 9.72340725,13.6564425 10.033651,13.9666862 C10.3438947,14.2769299 10.8468991,14.2769299 11.1571428,13.9666862 L13.9658723,11.1579566 C14.276116,10.8477129 14.276116,10.3447085 13.9658723,10.0344648 Z"></path></svg>; break;
    case 'LINK2': res = <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M11.7289758,8.90054871 L10.605484,7.7770569 L11.719127,6.66341387 C13.2703455,5.11219538 15.7853676,5.11219538 17.3365861,6.66341387 C18.8878046,8.21463236 18.8878046,10.7296545 17.3365861,12.280873 L16.2229431,13.394516 L15.0994513,12.2710242 L16.2130943,11.1573811 C17.1438254,10.22665 17.1438254,8.71763678 16.2130943,7.78690569 C15.2823632,6.85617459 13.77335,6.85617459 12.8426189,7.78690569 L11.7289758,8.90054871 Z M8.90054871,11.7289758 L7.78690569,12.8426189 C6.85617459,13.77335 6.85617459,15.2823632 7.78690569,16.2130943 C8.71763678,17.1438254 10.22665,17.1438254 11.1573811,16.2130943 L12.2710242,15.0994513 L13.394516,16.2229431 L12.280873,17.3365861 C10.7296545,18.8878046 8.21463236,18.8878046 6.66341387,17.3365861 C5.11219538,15.7853676 5.11219538,13.2703455 6.66341387,11.719127 L7.7770569,10.605484 L8.90054871,11.7289758 Z M13.9760363,11.1476092 L12.8527279,10.0243008 C13.1637094,9.72425892 13.6590544,9.72764691 13.9658723,10.0344648 C14.2726902,10.3412827 14.2760782,10.8366277 13.9760363,11.1476092 Z M11.1476231,13.9760503 C10.8366936,14.2768978 10.3407412,14.2737764 10.033651,13.9666862 C9.72656068,13.6595959 9.72343931,13.1636435 10.0242868,12.852714 L11.1476231,13.9760503 Z M6.43431458,7.56568542 L7.56568542,6.43431458 L17.5656854,16.4343146 L16.4343146,17.5656854 L6.43431458,7.56568542 Z"></path></svg>; break;
  }
  return res;
};

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
};

const TIP_REGEX = /\[.*?]/g;

const findTipEntities = (contentBlock, callback, contentState) => {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = TIP_REGEX.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};

const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} >
      {props.children}
    </a>
  );
};

const Wrap = styled.div`
  position: relative;
  border-radius: ${p => p.theme.general.borderRadius};
  display: block;
  background-color: ${p => p.theme.colors.gray.lighter};
  line-height: 1.7;
  width: 100%;
  overflow: hidden;
  font-size: 16px;
  color: #282b32;
  height: 300px;
  border-radius: 3px;
  border: solid 1px #e1e5e8;
  padding: 15px 50% 15px 15px;
  ${p => p.hideSearch && css`
    padding-right: 15px;
  `}
  .public-DraftEditor-content {
    height: 250px;
    overflow: auto;
    font-size: 12px;
    color: ${p => p.theme.colors.black};
    &::-webkit-scrollbar-track {
      border-radius: 2px;
      background-color: ${p => p.theme.colors.gray.light};
    }    
    &::-webkit-scrollbar {
      width: 3px;
      border-radius: 2px;
      background-color: ${p => p.theme.colors.gray.light};
    }    
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: ${p => p.theme.colors.primary};
      height: 100px;
    }
    & ul {
      padding-left: 0;
    }
    & ol {
      padding-left: 0;
    }
    & ul {
      list-style: none;
    }
    & ul li {
      display: flex;
      position: relative;
    }
    & ul li::before {
      content: "\\2022";
      color: ${({ theme }) => theme.colors.primary};
      font-weight: bold;
      display: inline-block; 
      width: 1em;
      margin-left: -1em;
      font-size: 20px;
      top: -7px;
      position: absolute;
    }
  }
  .public-DraftEditorPlaceholder-root {
    font-size: 12px;
  }
  ${p => p.theme.max('xs')`
    padding-right: 15px;
    padding: 0;
    height: auto;
    background: #fff;
    .public-DraftEditor-content {
      height: 168px;
      padding: 10px;
    }
  `};
`;

const Stripe = styled.div`
  position: absolute;
  height: 2px;
  bottom: 0;
  background-color: ${p => p.theme.colors.primary};
  left: 0;
  width: 100%;
  visibility: hidden;
  transform: rotateY(90deg);
  // transition: all .3s ease;
  will-change: transform;
  ${p => p.active && css`
    visibility: visible;
    transform: rotateY(0);
  `}
`;

const RichControlls = styled.div`
  user-select: none;
  ${p => p.theme.max('xs')`
    padding-left: 10px;
  `};
`;

const RichStyleButton = styled.span`
  width: 26px;
  height: 24px;
  fill: ${p => p.theme.colors.gray.dark};
  cursor: pointer;
  padding: 2px 0;
  display: inline-block;
  ${p => p.active && css`
    fill: ${p => p.theme.colors.primary};
  `}
  &:hover {
    fill: ${p => p.theme.colors.primary};
  }
`;

const StyleButtonsGroup = styled.div`
  display: inline-block;
  margin-right: 16px;
`;

const LeftSide = styled.div`
  padding-right: 15px;
  ${p => p.theme.max('xs')`
    padding-right: 0;
  `};
`;

const RightSide = styled.div`
  position: absolute;
  background: #fff;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  ${p => p.theme.max('xs')`
    position: relative;
    width: 100%;
    background-color: #f2f5fa;
  `};
`;

export default TextAreaEditor;
