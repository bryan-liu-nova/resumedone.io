import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';

import { PhotoUpload } from '/imports/core/ui/atoms';
import { UPDATE_RESUME_DETAIL } from '/imports/generator/api/apollo/client/mutations';
import {
  updateAfterDetailSave,
  updateDetailsOptimisticResponse,
} from '/imports/generator/api/apollo/client/helpers';
import { TEMPLATES } from '/imports/generator/api/constants';

@graphql(UPDATE_RESUME_DETAIL)
class UploadPhoto extends PureComponent {
  handleUpload = value => {
    const { variables: { docId, path }, mutate } = this.props;
    mutate({
      variables: { docId, path, value },
      update: updateAfterDetailSave(docId),
      optimisticResponse: updateDetailsOptimisticResponse(docId, path, value),
    });
  };

  render() {
    const { variables: { docId }, template } = this.props;
    const templateData = TEMPLATES.find(t => t.id === template);
    return (
      <PhotoUpload
          onUploaded={this.handleUpload}
          docId={docId}
          value={this.props.value}
          disabled={templateData.noUserPic}
      />
    );
  }
}


export default UploadPhoto;
