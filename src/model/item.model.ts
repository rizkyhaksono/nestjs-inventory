export class GetItemRequest {
  token: string;
}

export class PostItemRequest {
  name: string;
  quantity: number;
  userId: string;
}

export class PutItemRequest {
  name: string;
  quantity: number;
  userId: string;
}

export class DeleteItemRequest {
  name: string;
  userId: string;
}

export class ItemResponse {
  name: string;
  quantity: number;
  userId: string; 
}