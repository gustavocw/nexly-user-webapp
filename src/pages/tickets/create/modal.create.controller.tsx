import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicket } from "services/ticket.services";
import { toaster } from "components/ui/toaster";
import { useUser } from "hooks/useUser";
import { formatSelect } from "utils/formatSelect";
import useAuthStore from "stores/auth.store";

const createTicketSchema = z.object({
  name: z.string(),
  category: z.union([z.string(), z.array(z.string())]),
  description: z.string(),
  priority: z.string(),
});

type CreateTicketFormData = z.infer<typeof createTicketSchema>;

const useCreateTicketsController = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { area } = useAuthStore();
  const queryClient = useQueryClient()

  const { user } = useUser();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      priority: "",
    },
  });

  const { mutate: mutateTicket, isPending: creatingTicket } = useMutation({
    mutationFn: (data: NewTicket) => createTicket(area?._id, data),
    onSuccess: () => {
      setIsOpen(false);
      reset();
      toaster.create({
        title: "Ticket criado com sucesso",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["tickets"] })
    },
    onError: (error: any) => {
      toaster.create({
        title: "Erro ao criar ticket",
        description: error?.response?.data?.message,
        type: "error",
      });
    },
  });

  const onSubmit: SubmitHandler<CreateTicketFormData> = (data) => {
    const generateRandomNumber = () => {
      return Math.floor(1000000000 + Math.random() * 9000000000).toString();
    };

    const payload = {
      ...data,
      number: generateRandomNumber(),
      category: formatSelect(data.category),
    };
    console.log(payload);
    mutateTicket(payload);
  };

  const formValues = watch();

  const isValid =
    !!formValues.category &&
    !!formValues.description &&
    !!formValues.name &&
    !!formValues.priority &&
    !errors.description &&
    !errors.name &&
    !errors.priority;

  return {
    control,
    isValid,
    creatingTicket,
    handleSubmit,
    setIsOpen,
    isOpen,
    onSubmit,
    setValue,
    reset,
    errors,
    watch,
    user,
  };
};

export default useCreateTicketsController;
