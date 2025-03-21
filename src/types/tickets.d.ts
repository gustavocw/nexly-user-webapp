interface Ticket {
  _id?: string;
  identity: string;
  name: string;
  number: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  room?: Room;
}

interface NewTicket {
  name: string;
  number?: string;
  description: string;
  category: string;
  priority: string;
}

interface Message {
  _id: string;
  userMessage: string;
  contentMessage: string;
  createdAt: string;
  roomId: string;
  updatedAt: string;
  __v: number;
  isMyMessage: boolean;
  user: {
    name: string;
    photo: string;
    _id: string;
  };
}

interface Room {
  _id: string;
  nameRoom: string;
  createdAt: string;
  updatedAt: string;
  messageCount: number;
  user: {
    email: string;
    name: string;
    studentId: string;
    photo: string;
  };
  ticket: {
    name: string;
    number: string;
    category: string;
    priority: string;
  };
}
