import { ActionGetResponse, ActionPostRequest, ACTIONS_CORS_HEADERS,ActionGetRequest, ActionPostResponse } from "@solana/actions"

export async function GET(request:Request){
  
  const payload:ActionGetResponse={
          icon: "https://solana.com/_next/static/media/logotype.e4df684f.svg",
          label:"Buy me a coffe",
          description:"Buy me a coffee with SOL",
          title:"Himanshu Rai-Buy me a coffee"

  }
    return Response.json(payload,{
      headers:ACTIONS_CORS_HEADERS,
      status:201
    });
}

export async function POST(request:Request) {
    
  const postRequest:ActionPostRequest = await request.json();
  const userPubKey = postRequest.account;
  console.log(userPubKey)

  const response:ActionPostResponse ={
    transaction:"",
    message:"Some message"
  }
  return Response.json(response)
}