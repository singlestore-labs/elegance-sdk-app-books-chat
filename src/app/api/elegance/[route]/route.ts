import { NextRequest, NextResponse } from "next/server";
import { Routes } from "@singlestore/elegance-sdk/server";
import { getEleganceServerClient } from "@/services/eleganceServerClient";
import { ConnectionTypes } from "@singlestore/elegance-sdk/types";

export async function POST(request: NextRequest, { params }: { params: { route: Routes } }) {
  try {
    const connectionType = request.cookies.get("connectionType")?.value as ConnectionTypes;
    const result = await getEleganceServerClient(connectionType).handleRoute(params.route, await request.json());
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(error, { status: error.status });
  }
}
