import prismadb from "../db/prismadb";
import { SubscriptionService } from "./subscription-service";

export class StoreService {
    static async createStore(userId: string, name: string, description?: string, slug?: string) {
        try {

            const store_slug = slug || this.generateSlug(name)

            const store = await prismadb.store.create({
                data: {
                    name: name,
                    description: description || "",
                    userId: userId,
                    slug: store_slug,
                    isActive: true,
                }
            });

            await prismadb.storeSettings.create({
                data: {
                    storeId: store.id,
                },
            });

            await SubscriptionService.createSubscription(store.id)

            return store
        } catch (error) {
            console.log("Error creating store.", error)
        }
    }

    static async deleteStore(storeId: string) {
        try {
            await prismadb.store.delete({
                where: {
                    id: storeId
                }
            })
            return true
        } catch (error) {
            console.error("Error deleting store:", error)
        }
    }

    static generateSlug(name: string): string {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
    }

}