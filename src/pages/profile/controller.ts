import { useForm, SubmitHandler } from "react-hook-form";

export interface ProfileFormValues {
  name: string;
  lastname: string;
  phone: string;
  cpf: string;
  gender: string;
  bio: string;
  email: string;
}

export interface AddressFormValues {
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  uf: string;
  neuborhood: string;
}

export const useProfileController = () => {
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    control,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormValues>();

  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    reset: resetAddress,
    formState: { errors: addressErrors },
  } = useForm<AddressFormValues>();

  const onSubmitProfile: SubmitHandler<ProfileFormValues> = (data) => {
    console.log("Profile Data:", data);
  };

  const onSubmitAddress: SubmitHandler<AddressFormValues> = (data) => {
    console.log("Address Data:", data);
  };

  return {
    registerProfile,
    handleProfileSubmit,
    onSubmitProfile,
    resetProfile,
    profileErrors,
    control,

    registerAddress,
    handleAddressSubmit,
    onSubmitAddress,
    resetAddress,
    addressErrors,
  };
};
