export interface Messages {
    message: string
    id: int
}

export interface ChatMessages {
    _id: string;
    message: string;
    recipient: string;
    sender: string;
    timestamp: string;
    type: string;
    __v: number;
  }