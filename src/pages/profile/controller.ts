import { useMutation } from "@tanstack/react-query";
import { useUser } from "hooks/useUser";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  createAddress,
  updateAddress,
  updateProfile,
  uploadPhoto,
} from "services/user.services";
import { useEffect } from "react";
import axios from "axios";
import { useUnmask } from "hooks/useUnmask";
import { toaster } from "components/ui/toaster";
import { formatSelect } from "utils/formatSelect";

export const useProfileController = () => {
  const { user } = useUser();
  const unmask = useUnmask();

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    control: controlProfile,
    reset: resetProfile,
    formState: { errors: profileErrors },
  } = useForm<Partial<User>>({
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
  } = useForm<Partial<Address>>({
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
    onSuccess: () => {
      resetProfile();
      toaster.create({
        title: "Perfil atualizado com sucesso!",
        type: "success",
      })
    },
    onError: () => {
      toaster.create({
        title: "Erro ao atualizar perfil!",
        type: "error",
      })
    }
  });

  const { mutate: mutateAddress, isPending: creatingAddress } = useMutation({
    mutationFn: (params: Address) => createAddress(params),
  });

  const { mutate: mutateAddressUpdate, isPending: updatingAddress } = useMutation({
    mutationFn: (params: Partial<Address>) => updateAddress(params, user?.address?._id),
  });

  const onSubmitProfile: SubmitHandler<Partial<User>> = (data) => {
    const updatedData: Partial<User> = {};
    if (data.name !== user?.name) updatedData.name = data.name;
    if (data.lastname !== user?.lastname) updatedData.lastname = data.lastname;
    if (data.phone !== user?.phone) updatedData.phone = unmask(data?.phone);
    if (data.cpf !== user?.cpf) updatedData.cpf = data.cpf;
    if (data.sex !== user?.sex) updatedData.sex = formatSelect(data.sex);
    if (data.bio !== user?.bio) updatedData.bio = data.bio;
    if (data.email !== user?.email) updatedData.email = data.email;
    mutateProfile(updatedData);
    handleAddressSubmit(onSubmitAddress)();
  };

  const onSubmitAddress: SubmitHandler<Partial<Address>> = (data) => {
    if (user?.address?._id) {
      mutateAddressUpdate(data);
    } else {
      mutateAddress(data as Address);
    }
    resetAddress();
    resetProfile();
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
    creatingAddress,
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
