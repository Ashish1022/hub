import prismadb from "@/lib/db/prismadb"
import { StoreService } from "@/lib/services/store-services"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { userId, name, description, slug, logoUrl } = body

        if (!userId || !name) {
            return NextResponse.json({ error: "User ID and store name are required" }, { status: 400 })
        }

        const store = await StoreService.createStore(userId, name, description, slug)

        if (!store) {
            return NextResponse.json({ error: "Failed to create store" }, { status: 500 })
        }

        if (logoUrl) {
            await prismadb.store.update({
                where: { id: store.id },
                data: { logoUrl },
            })
        }

        return NextResponse.json({ store }, { status: 201 });
        
    } catch (error) {
        console.error("Error creating store:", error)
        return NextResponse.json({ error: "Internal server error", message: (error as Error).message }, { status: 500 })
    }
}

// export async function GET(req: NextRequest) {
//   try {
//     const url = new URL(req.url)
//     const userId = url.searchParams.get("userId")

//     if (!userId) {
//       return NextResponse.json({ error: "User ID is required" }, { status: 400 })
//     }

//     const stores = await StoreService.getUserStores(userId)

//     return NextResponse.json({ stores })
//   } catch (error) {
//     console.error("Error getting stores:", error)
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//   }
// }
