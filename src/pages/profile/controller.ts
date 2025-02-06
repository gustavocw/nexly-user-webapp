import { useMutation } from "@tanstack/react-query";
import { useUser } from "hooks/useUser";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  updateAddress,
  updateProfile,
  uploadPhoto,
} from "services/user.services";
import { useEffect } from "react";
import axios from "axios";

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
    setValue: setAddressValue,
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
          neighborhood: user?.address.neighborhood || "",
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
    mutationFn: (params: Partial<User>) => updateProfile(params),
  });

  const { mutate: mutateAddress, isPending: updatingAddress } = useMutation({
    mutationFn: (params: Address) => updateAddress(params, user?.address?._id),
  });

  const onSubmitProfile: SubmitHandler<User> = (data) => {
    const updatedData: Partial<User> = {};
    if (data.name !== user?.name) updatedData.name = data.name;
    if (data.lastname !== user?.lastname) updatedData.lastname = data.lastname;
    if (data.phone !== user?.phone) updatedData.phone = data.phone;
    if (data.cpf !== user?.cpf) updatedData.cpf = data.cpf;
    if (data.sex !== user?.sex) updatedData.sex = data.sex;
    if (data.bio !== user?.bio) updatedData.bio = data.bio;
    if (data.email !== user?.email) updatedData.email = data.email;
    mutateProfile(updatedData);
  };

  const onSubmitAddress: SubmitHandler<Address> = (data) => {
    mutateAddress(data);
  };

  const fetchAddressByCEP = async (cep: string) => {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    const { uf, localidade, logradouro, bairro } = response.data;
    setAddressValue("uf", uf);
    setAddressValue("city", localidade);
    setAddressValue("street", logradouro);
    setAddressValue("neighborhood", bairro);
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
    fetchAddressByCEP,
  };
};
