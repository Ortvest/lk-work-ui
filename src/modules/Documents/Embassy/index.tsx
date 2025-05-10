import classNames from 'classnames';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { EmbassyFormBody } from '@modules/Documents/Embassy/features/EmbassyFormBody';
import { EmbassyPreviewBody } from '@modules/Documents/Embassy/features/EmbassyPreviewBody';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserEmbassyDataMutation } from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { EmbassyDocument, EmbassyNotUploadedData } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';

export const Embassy = (): JSX.Element => {
  const methods = useForm<EmbassyNotUploadedData>({
    defaultValues: {
      documents: [{}],
    },
  });
  const [uploadfile] = useUploadPhotoMutation();
  const [collectEmbassyData] = useCollectUserEmbassyDataMutation();
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();
  const embassyDocuments = useTypedSelector((state) => state.userReducer.user?.documents.embassyDocuments);
  const { fields, append } = useFieldArray({
    control: methods.control,
    name: 'documents',
  });

  const onSaveHandler = async (data: EmbassyNotUploadedData): Promise<void> => {
    if (!employeeId) return;

    try {
      const result: EmbassyDocument[] = [];

      for (const document of data.documents) {
        let firstFileKey;
        if (document.embassyFirstDocumentPhoto) {
          const formData = new FormData();
          formData.append('file', document.embassyFirstDocumentPhoto);
          const response = await uploadfile(formData).unwrap();
          firstFileKey = response?.fileKey;
        }

        let secondFileKey;
        if (document.embassySecondDocumentPhoto) {
          const formData = new FormData();
          formData.append('file', document.embassySecondDocumentPhoto);
          const response = await uploadfile(formData).unwrap();
          secondFileKey = response?.fileKey;
        }

        const parsedDate = dateParser(JSON.stringify(document.embassyDateOfIssue));

        result.push({
          embassyFirstDocumentFileKey: firstFileKey,
          embassySecondDocumentFileKey: secondFileKey,
          embassyDateOfIssue: parsedDate,
        });
      }

      await collectEmbassyData({
        embassyData: result,
        employeeId,
      });

      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save embassy data:', error);
    }
  };

  const onAddFormBodyHandler = (): void => {
    append({});
  };

  const renderEmbassyContent = (): JSX.Element[] => {
    if (isEditModeEnabled) {
      return fields.map((field, index: number) => <EmbassyFormBody key={field.id} index={index} />);
    }

    if (embassyDocuments && embassyDocuments.length > 0) {
      return embassyDocuments.map((embassy, index: number) => (
        <EmbassyPreviewBody
          key={index}
          embassyFirstDocumentFileKey={embassy.embassyFirstDocumentFileKey || ''}
          embassySecondDocumentFileKey={embassy.embassySecondDocumentFileKey || ''}
          embassyDateOfIssue={embassy.embassyDateOfIssue || ''}
        />
      ));
    }

    return fields.map((field) => (
      <EmbassyPreviewBody
        key={field.id}
        embassyFirstDocumentFileKey=""
        embassySecondDocumentFileKey=""
        embassyDateOfIssue=""
      />
    ));
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('embassy')}>
        <form className={classNames('embassy-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader title="Embassy" subtitle="Leave information about your work" />
          {renderEmbassyContent()}
          <div className={classNames('embassy-button-wrapper')}>
            {isEditModeEnabled ? (
              <button type="button" className={classNames('embassy-button')} onClick={onAddFormBodyHandler}>
                + Add a document
              </button>
            ) : null}
          </div>
        </form>
      </section>
    </FormProvider>
  );
};
