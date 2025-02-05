import { useMutation } from "@tanstack/react-query";
import { useUser } from "hooks/useUser";
import { useForm, SubmitHandler } from "react-hook-form";
import { updateAddress, updateProfile, uploadPhoto } from "services/user.services";
import { useEffect } from "react";

export const useProfileController = () => {
  const { user } = useUser();

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    control: controlProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<User>({
    defaultValues: {
      name: "",
      lastname: "",
      phone: "",
      cpf: "",
      sex: "",
      bio: "",
      email: "",
    },
  });

  const {
    register: registerAddress,
    handleSubmit: handleAddressSubmit,
    reset: resetAddress,
    control: controlAdress,
    formState: { errors: addressErrors },
  } = useForm<Address>({
    defaultValues: {
      codeStreet: "",
      street: "",
      number: "",
      complement: "",
      city: "",
      uf: "",
    },
  });

  console.log(user);
  

  useEffect(() => {
    if (user) {
      resetProfile({
        name: user?.name || "",
        lastname: user?.lastname || "",
        phone: user?.phone || "",
        cpf: user?.cpf || "",
        sex: user?.sex || "",
        bio: user?.bio || "",
        email: user?.email || "",
      });

      if (user?.address) {
        resetAddress({
          codeStreet: user?.address.codeStreet || "",
          street: user?.address.street || "",
          number: user?.address.number || "",
          complement: user?.address.complement || "",
          city: user?.address.city || "",
          uf: user?.address.uf || "",
        });
      }
    }
  }, [user, resetProfile, resetAddress]);

  const { mutate: mutateFile, isPending: loadingImage } = useMutation({
    mutationFn: (file: any) => uploadPhoto(file),
  });

  const { mutate: mutateProfile, isPending: updatingProfile } = useMutation({
    mutationFn: (params: User) => updateProfile(params),
  });

  const { mutate: mutateAddress, isPending: updatingAddress } = useMutation({
    mutationFn: (params: Address) => updateAddress(params, user?.address?._id),
  });


  const onSubmitProfile: SubmitHandler<User> = (data) => {
    mutateProfile(data);
  };

  const onSubmitAddress: SubmitHandler<Address> = (data) => {
    mutateAddress(data);
  };

  return {
    registerProfile,
    handleProfileSubmit,
    onSubmitProfile,
    updatingAddress,
    updatingProfile,
    resetProfile,
    profileErrors,
    controlProfile,
    controlAdress,
    mutateFile,
    loadingImage,
    registerAddress,
    handleAddressSubmit,
    onSubmitAddress,
    resetAddress,
    addressErrors,
  };
};
