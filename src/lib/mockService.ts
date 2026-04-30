// Importação dos dados locais (Certifique-se de que os arquivos existem em src/data/)
import newsData from '../data/news.json';
import eventsData from '../data/events.json';
import productsData from '../data/productsolutions.json';
import subsidiariesData from '../data/subsidiaries.json';

export const MockBaseCrudService = {
    /**
     * Simula o método getAll da Wix
     * @param collection Nome da coleção (news, events, etc)
     * @param _filters Filtros (ignorado no mock)
     * @param _options Opções como limite e skip (ignorado no mock)
     */
    getAll: async <T>(
        collection: string,
        _filters: any[] = [],
        _options: { limit?: number; skip?: number } = {}
    ): Promise<{ items: T[] }> => {

        // Simula um pequeno delay de rede para manter o comportamento de Loading (opcional)
        // await new Promise(resolve => setTimeout(resolve, 100));

        switch (collection.toLowerCase()) {
            case 'news':
                return { items: newsData as T[] };

            case 'events':
                return { items: eventsData as T[] };

            case 'productsolutions':
            case 'products': // Caso algum componente use um nome diferente
                return { items: productsData as T[] };

            case 'subsidiaries':
                return { items: subsidiariesData as T[] };

            default:
                console.warn(`MockBaseCrudService: Coleção "${collection}" não encontrada no mock.`);
                return { items: [] };
        }
    },

    // Caso você precise simular a busca de um item único por ID no futuro
    getById: async <T>(collection: string, id: string): Promise<T | null> => {
        const { items } = await MockBaseCrudService.getAll<any>(collection);
        return items.find((item: any) => item._id === id) || null;
    }
};
