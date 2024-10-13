import fetcher from "@/utils/fetcher/Sfetcher";
import route from "../routes";

export async function getHome() {
    const res = await fetcher(route("home"));
    return res;
}
