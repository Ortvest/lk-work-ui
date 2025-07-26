import { useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { BankInfoFormBody } from '@modules/BankInfo/features/BankInfoFormBody';
import { BankInfoPreviewBody } from '@modules/BankInfo/features/BankInfoPreviewBody';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserBankInfoMutation } from '@global/api/updateUserData/collectData.api';
import { BankInfo } from '@shared/interfaces/User.interfaces';

export const BankInformation = (): JSX.Element => {
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const [collectUserBankInfo] = useCollectUserBankInfoMutation();
  const dispatch = useTypedDispatch();
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const bankInfo = useTypedSelector((state) => state.userReducer.user?.bankInfo);

  const methods = useForm<BankInfo>({
    defaultValues: { bankName: bankInfo?.bankName || '', bankAccountNumber: bankInfo?.bankAccountNumber || '' },
  });

  const onSaveHandler = async (data: BankInfo): Promise<void> => {
    if (!employeeId) return;

    try {
      await collectUserBankInfo({ bankInfo: data, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save address:', error);
    }
  };

  useEffect(() => {
    if (bankInfo) {
      methods.reset({
        bankName: bankInfo?.bankName || '',
        bankAccountNumber: bankInfo?.bankAccountNumber || '',
      });
    }
  }, [bankInfo]);

  return (
    <FormProvider {...methods}>
      <section className={classNames('bank-info')}>
        <form className={classNames('bank-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader title="Bank Info" subtitle="Leave information about your bank" />
          {isEditModeEnabled ? <BankInfoFormBody /> : <BankInfoPreviewBody />}
        </form>
      </section>
    </FormProvider>
  );
};
