import fileRepo from "@/app/repo/fileRepo.js";

export async function GET() {
  const data = await fileRepo.getData();
  return Response.json(data);
}
