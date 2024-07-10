export interface Messages {
    message: string
    id: int
}

export interface ChatMessages {
    _id: string;
    message: string;
    sender: string;
    recipient: string;
    timestamp: string; 
    type: string; 
    __v?: number;
  }