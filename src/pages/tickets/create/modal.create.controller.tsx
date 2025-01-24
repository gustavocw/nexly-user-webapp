import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createTicket } from "services/ticket.services";

const createTicketSchema = z.object({
  name: z.string(),
  number: z.string(),
  category: z.string(),
  description: z.string(),
  priority: z.string(),
});

type CreateTicketFormData = z.infer<typeof createTicketSchema>;

const useCreateTicketsController = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      name: "test",
      number: "123",
      category: "af",
      description: "af",
      priority: "BAIXA",
    },
  });

  const { mutate: mutateTicket } = useMutation({
    mutationFn: (data: NewTicket) => createTicket("67855cb3cef632d2739a8b48", data),
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onSubmit: SubmitHandler<CreateTicketFormData> = (data) => {
    console.log(data);
    mutateTicket(data);
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
