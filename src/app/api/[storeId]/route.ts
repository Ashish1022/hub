import { StoreService } from "@/lib/services/store-services";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { storeId: string } }
) {
    try {
        const storeId = params.storeId

        if (!storeId) {
            return NextResponse.json({ error: "Store ID is required" }, { status: 400 })
        }

        await StoreService.deleteStore(storeId)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting store:", error)
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    }
}