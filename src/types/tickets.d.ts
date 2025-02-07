interface Ticket {
  identity: string;
  name: string;
  number: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
}

interface NewTicket {
  name: string;
  number?: string;
  description: string;
  category: string;
  priority: string;
}
