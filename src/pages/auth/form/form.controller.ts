import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "hooks/useAuth";
import useAuthStore from "stores/auth.store";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "O campo email é obrigatório",
      invalid_type_error: "O campo email deve ser uma string",
    })
    .email({ message: "Insira um email válido" })
    .nonempty({ message: "O campo email é obrigatório" }),

  password: z.string({
    required_error: "O campo senha é obrigatório",
    invalid_type_error: "O campo senha deve ser uma string",
  }),
});

type LoginFormData = z.infer<typeof loginSchema>;

type ServerErrorResponse = {
  response?: {
    data?: {
      message?: string;
    };
  };
};

export const useLoginController = () => {
  const { login } = useAuth();
  const { email, password, setEmail, setPassword, rememberMe, setRememberMe } =
    useAuthStore();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: email ?? "",
      password: password ?? "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      login({
        email: data.email,
        password: data.password,
      });
      if (rememberMe === "true") {
        setEmail(data.email);
        setPassword(data.password);
      } else {
        setEmail(null);
        setPassword(null);
      }
    } catch (error: unknown) {
      const serverError = error as ServerErrorResponse;

      if (serverError.response?.data?.message) {
        setError("email", {
          type: "manual",
          message: "Credenciais inválidas. Verifique seu e-mail e senha.",
        });
      } else {
        console.error("Erro no login:", error);
      }
    }
  };

  return {
    setRememberMe,
    rememberMe,
    handleSubmit,
    control,
    errors,
    onSubmit,
    reset,
  };
};
