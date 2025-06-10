export const HOST = process.env.NEXT_PUBLIC_BASE_URL;
// Auth Routes
export const AUTH_ROUTE = `${HOST}/api/auth`;

export const LOGIN_ROUTE = "auth/login";
export const REGISTER_ROUTE = "auth/register";
export const VALIDATE_REFRESH_TOKEN_ROUTE = "validateRefreshToken";

// User Routes
export const ALL_USERS = "users";
export const CREATE_USER = "users";
export const GET_USER  = (id: any) => `users/${id}`;
export const UPDATE_USER  = (id: any) => `users/${id}`;
export const DELETE_USER  = (id: any) => `users/${id}`;
export const UPDATE_PERSONNAL_INFO = "user/info";
export const UPDATE_EMAIL_ADDRESS = "user/email";
export const UPDATE_PASSWORD = "user/pass";


// Role Routes
export const ALL_ROLES = "roles";
export const CREATE_ROLE = "roles";
export const GET_ROLE  = (id: any) => `roles/${id}`;
export const UPDATE_ROLE  = (id: any) => `roles/${id}`;
export const DELETE_ROLE  = (id: any) => `roles/${id}`;

// Permission Routes
export const ALL_PERMISSIONS = "permissions";
export const CREATE_PERMISSION = "permissions";
export const GET_PERMISSION  = (id: any) => `permissions/${id}`;
export const UPDATE_PERMISSION  = (id: any) => `permissions/${id}`;
export const DELETE_PERMISSION  = (id: any) => `permissions/${id}`;


// Service Routes
export const ALL_SERVICES = "services";
export const CREATE_SERVICE = "services";
export const GET_SERVICE  = (id: any) => `services/${id}`;
export const UPDATE_SERVICE  = (id: any) => `services/${id}`;
export const DELETE_SERVICE  = (id: any) => `services/${id}`;


// Type Routes
export const ALL_TYPES = "types";
export const CREATE_TYPE = "types";
export const GET_TYPE  = (id: any) => `types/${id}`;
export const UPDATE_TYPE  = (id: any) => `types/${id}`;
export const DELETE_TYPE  = (id: any) => `types/${id}`;


// Brand Routes
export const ALL_BRANDS = "brands";
export const CREATE_BRAND = "brands";
export const GET_BRAND  = (id: any) => `brands/${id}`;
export const UPDATE_BRAND  = (id: any) => `brands/${id}`;
export const DELETE_BRAND  = (id: any) => `brands/${id}`;

// Model Routes
export const ALL_MODELS = "models";
export const CREATE_MODEL = "models";
export const GET_MODEL  = (id: any) => `models/${id}`;
export const UPDATE_MODEL  = (id: any) => `models/${id}`;
export const DELETE_MODEL  = (id: any) => `models/${id}`;

// Variant Routes
export const ALL_VARIANTS = "variants";
export const CREATE_VARIANT = "variants";
export const GET_VARIANT  = (id: any) => `variants/${id}`;
export const UPDATE_VARIANT  = (id: any) => `variants/${id}`;
export const DELETE_VARIANT  = (id: any) => `variants/${id}`;


// Category Routes
export const ALL_CATEGORIES = "categories";
export const CREATE_CATEGORY = "categories";
export const GET_CATEGORY  = (id: any) => `categories/${id}`;
export const UPDATE_CATEGORY  = (id: any) => `categories/${id}`;
export const DELETE_CATEGORY  = (id: any) => `categories/${id}`;


// Sub Category Routes
export const ALL_SUBCATEGORIES = "sub-categories";
export const CREATE_SUBCATEGORY = "sub-categories";
export const GET_SUBCATEGORY  = (id: any) => `sub-categories/${id}`;
export const UPDATE_SUBCATEGORY  = (id: any) => `sub-categories/${id}`;
export const DELETE_SUBCATEGORY  = (id: any) => `sub-categories/${id}`;

// Chat Routes
export const ALL_ROOMS = "rooms";
export const MY_ROOMS = "rooms/me";
export const CREATE_ROOM = "rooms";
export const DELETE_ROOM  = (id: any) => `rooms/${id}`;
export const ROOM_MESSAGES = (id: any) => `messages/${id}`;
export const SEND_MESSAGE = "messages";

// Blog Routes
export const ALL_BLOGS = "blogs";
export const MY_BLOGS = "blogs/me";
export const CREATE_BLOG = "blogs";
export const GET_BLOG  = (identifier: any) => `blogs/${identifier}`;
// export const GET_BLOG_BY_SLUG  = (slug: string) => `blogs/slug/${slug}`;
export const UPDATE_BLOG  = (id: any) => `blogs/${id}`;
export const DELETE_BLOG  = (id: any) => `blogs/${id}`;


// Feature and Specification Routes
export const ALL_FEATURE_AND_SPECIFICATIONS = "feature-and-specifications";
export const ALL_BRAND_MODEL_AND_VARIANTS = "all-brand-model-and-variants";
export const ALL_MODELS_BY_SUBCATEGORY  = (identifier: any) => `all-models-by-category/${identifier}`;