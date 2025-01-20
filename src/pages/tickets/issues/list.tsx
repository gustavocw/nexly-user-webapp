import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import Gestures from "components/motion/gesture";
import {
  CarouselProvider,
  Slider,
  Slide
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const ListIssues = () => {
  return (
    <VStack align="flex-start" w="90%">
      <Text color="neutral" fontSize="20px" mb={4}>
        Perguntas frequentes
      </Text>
      <CarouselProvider
        naturalSlideWidth={16}
        naturalSlideHeight={9}
        totalSlides={issuesList.length}
        visibleSlides={5}
        infinite
      >
        <Slider style={{ width: "95vw" }}>
          {issuesList.map((ticket: any, index: number) => (
            <Slide key={ticket.id || index} index={index}>
              <Flex px={2} align="flex-start" w="100%">
                <Gestures>
                  <Box
                    borderRadius="8px"
                    bg="neutral.60"
                    p={4}
                    shadow="md"
                    cursor="pointer"
                    w="340px"
                    minH="180px"
                    display="flex"
                    flexDirection="column"
                  >
                    <Text color="neutral" fontSize="md" fontWeight="bold" mb={2}>
                      {ticket.question}
                    </Text>
                    <Text color="neutral.10" fontSize="sm">
                      {ticket.answer}
                    </Text>
                  </Box>
                </Gestures>
              </Flex>
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </VStack>
  );
};

export default ListIssues;

const issuesList = [
  {
    "id": 1,
    "question": "Como faço para acessar meus cursos?",
    "answer": "Após fazer login na área de membros, clique no menu 'Meus Cursos' e selecione o curso desejado. Lá você verá todas as aulas disponíveis."
  },
  {
    "id": 2,
    "question": "Esqueci minha senha. Como posso redefini-la?",
    "answer": "Clique em 'Esqueci minha senha' na página de login e siga as instruções enviadas para o seu e-mail cadastrado."
  },
  {
    "id": 3,
    "question": "Posso acessar os cursos pelo celular?",
    "answer": "Sim, nossa plataforma é compatível com dispositivos móveis. Basta acessar o site pelo navegador do seu celular ou tablet."
  },
  {
    "id": 4,
    "question": "Os cursos possuem certificado de conclusão?",
    "answer": "Sim, ao completar todos os módulos de um curso, você poderá gerar e baixar seu certificado diretamente na área de membros."
  },
  {
    "id": 5,
    "question": "Por quanto tempo terei acesso aos cursos?",
    "answer": "O acesso aos cursos é vitalício, salvo indicação em contrário no momento da compra."
  },
  {
    "id": 6,
    "question": "Como faço para alterar meu e-mail cadastrado?",
    "answer": "Na área de membros, vá até 'Minha Conta', clique em 'Editar Perfil' e atualize seu e-mail."
  },
  {
    "id": 7,
    "question": "Os cursos têm suporte para dúvidas?",
    "answer": "Sim, você pode enviar suas dúvidas diretamente pela seção de comentários no curso ou pelo nosso canal de suporte na área de membros."
  },
  {
    "id": 8,
    "question": "Como faço para cancelar minha assinatura?",
    "answer": "Para cancelar sua assinatura, acesse 'Minha Conta', clique em 'Gerenciar Assinaturas' e siga as instruções para cancelamento."
  },
  {
    "id": 9,
    "question": "Posso baixar as aulas para assistir offline?",
    "answer": "No momento, as aulas não podem ser baixadas. Porém, você pode acessá-las a qualquer momento, desde que tenha conexão com a internet."
  },
  {
    "id": 10,
    "question": "Há um limite de dispositivos conectados à minha conta?",
    "answer": "Sim, por motivos de segurança, você pode acessar sua conta em até 3 dispositivos diferentes simultaneamente."
  }
]

