import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const createTicketSchema = z.object({
  category: z.string(),
  description: z
    .string(),
  priority: z.string(),
});

type CreateTicketFormData = z.infer<typeof createTicketSchema>;

const useCreateTicketsController = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {errors},
  } = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      category: "",
      description: "",
      priority: "",
    },
  });

  const onSubmit: SubmitHandler<CreateTicketFormData> = (data) => {
    console.log("Dados do formulário:", data);
    reset();
  };

  return {
    control,
    handleSubmit,
    setIsOpen,
    isOpen,
    onSubmit,
    setValue,
    reset,
    errors,
    watch,
  };
};

export default useCreateTicketsController;
