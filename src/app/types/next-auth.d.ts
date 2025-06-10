import NextAuth from "next-auth/next";

declare module "next-auth"{ 
    enum StatusEnum {
        Active = "active",
        Inactive = "inactive",
    }
    enum UserStatusEnum {
        Pending = "pending",
        Active = "active",
        Inactive = "inactive",
        Approved = "approved",
        Rejected = "rejected",
    }
    enum BlogStatusEnum {
        DRAFT = "draft",
        PUBLISHED = "published",
        ARCHIVED = "archived",
    }
    enum TransmissionEnum {
        AUTOMATIC = "Manual",
        MANUAL = "Automatic",
        BOTH = "Automatic & Manual",
    }
    enum FuelTypeEnum {
        PETROL = "Petrol",
        DIESEL = "Diesel",
        ELECTRIC = "Electric",
        HYBRID = "Hybrid",
    }
    enum TypeEnum {
        FEATURE = "feature",
        SPECIFICATION = "specification",
    }
    enum CategoryEnum {
        DIMENSIONS = "Dimensions",
        ENGINE_MOTOR = "Engine/Motor",
        TRANSMISSION = "Transmission",
        STEERING = "Steering",
        SUSPENSION_BRAKES = "Suspension & Brakes",
        WHEELS_TYRES = "Wheels & Tyres",
        FUEL_ECONOMY = "Fuel Economy",
        SAFETY = "Safety",
        EXTERIOR = "Exterior",
        INSTRUMENTATION = "Instrumentation",
        INFOTAINMENT = "Infotainment",
        COMFORT_CONVENIENCE = "Comfort & Convenience"
    }
    enum FieldEnum {
        BOOLEAN = "boolean",
        TEXT = "text",
        NUMBER = "number",
    }
    
    interface Session{
        user:{
            firstName: string;
            lastName: string;
            id: number;
            name: string;
            email: string;
            image:string;
            address: string;
            zip: string;
            role:{
                id: number;
                name: string;
                permissions: Array;
            }
            accessToken: string;
            refreshToken: string;
        }
        accessToken: string;
        refreshToken: string;
    }

    interface User{
        firstName: string;
        lastName: string;
        id: number;
        name: string;
        email: string;
        image:string;
        role:{
            id: number;
            name: string;
            permissions: Array;
        }
        created_at?: string | null;
        updated_at?: string | null;
    }

    interface Message{
        id: number;
        sender_delete: boolean;
        receiver_delete: boolean;
        message: string;
        type: string;
        status: string;
        file_type: string | null;
        file:  string | null;
        read_at:  string | null;
        created_at:  string | null;
        updated_at:  string | null;
        deleted_at:  string | null;
        receiver: User;
        sender: User;
        self: boolean;
    }
    interface Room{
        messages: Message[];
        id: number;
        receiver: User;
        sender: User;
        lastMessage:Message;
        created_at:  string | null;
        updated_at:  string | null;
        unreadMessages: number;
    }
    interface Service{
        id: number;
        name: string;
        status: StatusEnum;
        created_at:  string | null;
        updated_at:  string | null;
    }
    interface Type{
        id: number;
        name: string;
        status: StatusEnum;
        created_at:  string | null;
        updated_at:  string | null;
    }
    interface Brand{
        id: number;
        name: string;
        slug: string;
        logo: string;
        existingImages: string[];
        heading: string;
        description: string;
        content: string;
        status: StatusEnum;
        meta_title: string;
        meta_keywords: string;
        meta_description: string;
        created_at:  string | null;
        updated_at:  string | null;
        models: Model[];
        categories: Category[];
    }
    interface Model{
        id: number;
        name: string;
        slug: string;
        images?: (any | undefined)[] | undefined;
        existingImages: string[];
        heading: string;
        description: string;
        content: string;
        status: StatusEnum;
        meta_title: string;
        meta_keywords: string;
        meta_description: string;
        created_at:  string | null;
        updated_at:  string | null;
        brand: Brand;
        sub_category: SubCategory;
        variants?: Variant[];
        pros?: Pros[];
        cons?: Cons[];
    }
    interface Variant{
        id: number;
        name: string;
        slug: string;
        images?: (any | undefined)[] | undefined;
        existingImages: string[];
        heading: string;
        description: string;
        content: string;
        mileage_from: number;
        mileage_to: number;
        cc: number;
        transmission: TransmissionEnum;
        fuel_type: FuelTypeEnum;
        price: number;
        year: number;
        status: StatusEnum;
        meta_title: string;
        meta_keywords: string;
        meta_description: string;
        created_at:  string | null;
        updated_at:  string | null;
        brand: Brand;
        model: Model;
        colors?: Color[];
        variantFeatureAndSpecifications?: VariantFeatureAndSpecification[];
    }
    interface Category{
        id: number;
        name: string;
        status: StatusEnum;
        meta_title: string;
        meta_keywords: string;
        meta_description: string;
        created_at:  string | null;
        updated_at:  string | null;
        sub_categories: SubCategory[];
    }
    interface SubCategory{
        id: number;
        name: string;
        slug: string;
        status: StatusEnum;
        logo: string;
        existingImages: string[];
        meta_title: string;
        meta_keywords: string;
        meta_description: string;
        created_at:  string | null;
        updated_at:  string | null;
        category: Category;
        models?: Model[];
    }
    interface Role{
        id: number;
        name: string;
        permissions: Array;
        created_at:  string | null;
        updated_at:  string | null;
    }
    interface Permission{
        id: number;
        name: string;
        created_at:  string | null;
        updated_at:  string | null;
    }
    interface Tag{
        id: number;
        name: string;
    }
    interface Pros{
        id: number;
        value: string;
    }
    interface Cons{
        id: number;
        value: string;
    }
    interface Color{
        id: number;
        name: string;
        hex: string;
    }

    interface Blog{
        id: number;
        title: string;
        slug: string;
        // slug?: string | undefined;
        images?: (any | undefined)[] | undefined;
        existingImages: string[];
        content: string;
        author: number;
        published_at: Date;
        meta_title: string;
        meta_keywords: string;
        meta_description: string;
        model: Model;
        pros?: Pros[];
        cons?: Cons[];
        tags?: Tag[];
    }

    interface FeatureAndSpecification{
        id: number;
        type: TypeEnum;
        category: CategoryEnum;
        name: string;
        field: FieldEnum;
        created_at:  string | null;
        updated_at:  string | null;
    }
    interface VariantFeatureAndSpecification{
        id: number;
        variant: Variant;
        featureAndSpecification: FeatureAndSpecification;
        value: string;
        created_at:  string | null;
        updated_at:  string | null;
    }
}