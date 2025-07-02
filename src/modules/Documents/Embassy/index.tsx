import { useEffect } from 'react';

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
import { EmbassyDocument } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';
import { datePartsParser } from '@shared/utils/datePartsParser';

export const Embassy = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const isEditModeEnabled = useTypedSelector((state) => state.CommonReducer.isEditModeEnabled);
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const embassyDocuments = useTypedSelector((state) => state.userReducer.user?.documents.embassyDocuments);

  const [uploadfile] = useUploadPhotoMutation();
  const [collectEmbassyData] = useCollectUserEmbassyDataMutation();

  const methods = useForm<{ documents: EmbassyDocument[] }>({
    defaultValues: {
      documents: embassyDocuments?.map((doc) => ({
        embassyFirstDocumentFileKey: doc.embassyFirstDocumentFileKey || '',
        embassySecondDocumentFileKey: doc.embassySecondDocumentFileKey || '',
        embassyDateOfIssue: datePartsParser(doc.embassyDateOfIssue),
      })) || [{}],
    },
  });

  const { fields, append } = useFieldArray({
    control: methods.control,
    name: 'documents',
  });

  useEffect(() => {
    if (embassyDocuments && embassyDocuments.length) {
      methods.reset({
        documents: embassyDocuments.map((doc) => ({
          embassyFirstDocumentFileKey: doc.embassyFirstDocumentFileKey || '',
          embassySecondDocumentFileKey: doc.embassySecondDocumentFileKey || '',
          embassyDateOfIssue: datePartsParser(doc.embassyDateOfIssue),
        })),
      });
    }
  }, [embassyDocuments]);

  const onSaveHandler = async (data: { documents: EmbassyDocument[] }): Promise<void> => {
    if (!employeeId) return;

    try {
      const result: EmbassyDocument[] = [];

      for (let i = 0; i < data.documents.length; i++) {
        const current = data.documents[i];
        const previous = embassyDocuments?.[i];

        let firstFileKey =
          typeof current.embassyFirstDocumentFileKey === 'string' ? current.embassyFirstDocumentFileKey : undefined;

        if (current.embassyFirstDocumentFileKey instanceof File) {
          const formData = new FormData();
          formData.append('file', current.embassyFirstDocumentFileKey);
          const res = await uploadfile(formData).unwrap();
          firstFileKey = res.fileKey;
        } else if (!firstFileKey && previous?.embassyFirstDocumentFileKey) {
          firstFileKey = previous.embassyFirstDocumentFileKey as string;
        }

        let secondFileKey =
          typeof current.embassySecondDocumentFileKey === 'string' ? current.embassySecondDocumentFileKey : undefined;

        if (current.embassySecondDocumentFileKey instanceof File) {
          const formData = new FormData();
          formData.append('file', current.embassySecondDocumentFileKey);
          const res = await uploadfile(formData).unwrap();
          secondFileKey = res.fileKey;
        } else if (!secondFileKey && previous?.embassySecondDocumentFileKey) {
          secondFileKey = previous.embassySecondDocumentFileKey as string;
        }

        const dateOfIssue = current.embassyDateOfIssue
          ? dateParser(JSON.stringify(current.embassyDateOfIssue))
          : previous?.embassyDateOfIssue || '';

        result.push({
          embassyFirstDocumentFileKey: firstFileKey,
          embassySecondDocumentFileKey: secondFileKey,
          embassyDateOfIssue: dateOfIssue,
        });
      }

      await collectEmbassyData({ embassyData: result, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save embassy data:', error);
    }
  };

  const renderEmbassyContent = (): JSX.Element[] => {
    if (isEditModeEnabled) {
      return fields.map((field, index) => <EmbassyFormBody key={field.id} index={index} />);
    }

    const embassyDataToRender: EmbassyDocument[] =
      embassyDocuments && embassyDocuments.length > 0
        ? embassyDocuments
        : [
            {
              embassyFirstDocumentFileKey: '',
              embassySecondDocumentFileKey: '',
              embassyDateOfIssue: '',
            },
          ];

    return embassyDataToRender.map((embassy, index) => (
      <EmbassyPreviewBody
        key={index}
        embassyFirstDocumentFileKey={
          typeof embassy.embassyFirstDocumentFileKey === 'string' ? embassy.embassyFirstDocumentFileKey : ''
        }
        embassySecondDocumentFileKey={
          typeof embassy.embassySecondDocumentFileKey === 'string' ? embassy.embassySecondDocumentFileKey : ''
        }
        embassyDateOfIssue={(embassy.embassyDateOfIssue as string) || ''}
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
          {isEditModeEnabled && (
            <div className="embassy-button-wrapper">
              <button type="button" className={classNames('embassy-button')} onClick={() => append({})}>
                + Add a document
              </button>
            </div>
          )}
        </form>
      </section>
    </FormProvider>
  );
};
