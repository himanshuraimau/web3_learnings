import {ActionGetResponse} from "@solana/actions" 

export async function GET(request: Request) {
  const response: ActionGetResponse = {
    icon:"🚀",
    title:"Hello World",
    description:"This is a test action",
    label:"Test Action",
    error:{
      message:"This is an error",
    },

  }
  return Response.json(response)
}

export async function POST(request: Request) {
                const response: ActionGetResponse = {
                              transaction: "",
                              message: "This is a test action",
                };
                return Response.json(response);


}