export const Appwrite ={
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    datababaseId: import.meta.env.VITE_APPWRITE_DATABASE_GUARDERIA,
    collections:{
        products:  import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID,
        profiles: import.meta.env.VITE_APPWRITE_PROFILES_COLLECTION_ID,
        servicios: import.meta.env.VITE_APPWRITE_SERVICIOS_COLLECTION_ID,
        docentes : import.meta.env.VITE_APPWRITE_DOCENTES_COLLECTION_ID,
        alumnos : import.meta.env.VITE_APPWRITE_ALUMNOS_COLLECTION_ID,
    },
        
    buckets:{
        pictures: import.meta.env.VITE_APPWRITE_PICTURES,
        },
    
}

