import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { LocationFormBody } from '@modules/Location/features/LocationFormBody';
import { LocationPreviewBody } from '@modules/Location/features/LocationPreviewBody';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserAddressMutation } from '@global/api/updateUserData/collectData.api';
import { Address } from '@shared/interfaces/User.interfaces';

export const Location = (): JSX.Element => {
  const methods = useForm<Address>();
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const [collectUserAddress] = useCollectUserAddressMutation();
  const dispatch = useTypedDispatch();
  const { setIsEditModeEnabled } = CommonSlice.actions;

  const onSaveHandler = async (data: Address): Promise<void> => {
    if (!employeeId) return;

    try {
      await collectUserAddress({ address: data, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save address:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('location')}>
        <form className={classNames('location-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader title="Location" subtitle="Fill in information about your actual place of residence" />
          {isEditModeEnabled ? <LocationFormBody /> : <LocationPreviewBody />}
        </form>
      </section>
    </FormProvider>
  );
};
