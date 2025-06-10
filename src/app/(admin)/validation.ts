import * as yup from "yup";


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

// Supported formats (modify as needed)
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
// const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/gif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 6; // Maximum images allowed

export const typeCreateUpdateSchema = yup
    .object({
        name: yup.string().required("Name is a required field"),
    })
    .required();

export const brandCreateUpdateSchema = yup
    .object({
        name: yup.string().required("Name is a required field"),
        heading: yup.string().required("Heading is a required field"),
        categories: yup
            .array()
            .of(yup.number().required("Each item must be a number"))
            .min(1, "Select at least one Category")
            .required("Category is a required field"),
        // content: yup.string().required("Content is a required field"),
        content: yup.string(),
        description: yup
            .string()
            .required("Short Description is a required field"),
        images: yup.array()
        .of(
            yup.mixed()
            .test("fileSize", "File size too large (Max 5MB)", (file) =>
                file ? (file as File).size <= MAX_FILE_SIZE : true
            )
            .test(
                "fileFormat",
                "Unsupported format (JPEG, PNG, GIF only)",
                (file) =>
                    file ? SUPPORTED_FORMATS.includes((file as File).type) : true
            )
        )
        .when(["$isUpdate", "existingImages"], ([isUpdate, existingImages], schema) => {
            return isUpdate[0] || (Array.isArray(existingImages) && existingImages.length > 0)
                ? schema
                : schema.min(1, "At least one image is required").required("Images are required");
        }),
        existingImages: yup.array().default([]),
        meta_title: yup.string().required("Meta Title is a required field"),
        meta_keywords: yup.string().required("Meta Keywords is a required field"),
        meta_description: yup
            .string()
            .required("Meta Description is a required field"),
    })
    .required();

export const categoryCreateUpdateSchema = yup
    .object({
        name: yup.string().required("Name is a required field"),
        meta_title: yup.string().required("Meta Title is a required field"),
        meta_keywords: yup.string().required("Meta Keywords is a required field"),
        meta_description: yup
            .string()
            .required("Meta Description is a required field"),
    })
    .required();

export const subCategoryCreateUpdateSchema = yup
    .object({
        name: yup.string().required("Name is a required field"),
        category: yup
            .number()
            .required("Category is a required field")
            .transform((value) => (isNaN(value) ? undefined : value)),
        images: yup.array()
        .of(
            yup.mixed()
            .test("fileSize", "File size too large (Max 5MB)", (file) =>
                file ? (file as File).size <= MAX_FILE_SIZE : true
            )
            .test(
                "fileFormat",
                "Unsupported format (JPEG, PNG, GIF only)",
                (file) =>
                    file ? SUPPORTED_FORMATS.includes((file as File).type) : true
            )
        )
        .when(["$isUpdate", "existingImages"], ([isUpdate, existingImages], schema) => {
            return isUpdate[0] || (Array.isArray(existingImages) && existingImages.length > 0)
                ? schema
                : schema.min(1, "At least one image is required").required("Images are required");
        }),
        existingImages: yup.array().default([]),
        meta_title: yup.string().required("Meta Title is a required field"),
        meta_keywords: yup.string().required("Meta Keywords is a required field"),
        meta_description: yup
            .string()
            .required("Meta Description is a required field"),
    })
    .required();

export const modelCreateUpdateSchema = yup
    .object({
        name: yup.string().required("Name is a required field"),
        heading: yup.string().required("Heading is a required field"),
        description: yup.string().required("Short Description is a required field"),
        content: yup.string().required("Content is a required field"),
        images: yup.array()
        .of(
            yup.mixed()
            .test("fileSize", "File size too large (Max 5MB)", (file) =>
                file ? (file as File).size <= MAX_FILE_SIZE : true
            )
            .test(
                "fileFormat",
                "Unsupported format (JPEG, PNG, GIF only)",
                (file) =>
                    file ? SUPPORTED_FORMATS.includes((file as File).type) : true
            )
        )
        .when(["$isUpdate", "existingImages"], ([isUpdate, existingImages], schema) => {
            return isUpdate[0] || (Array.isArray(existingImages) && existingImages.length > 0)
                ? schema
                : schema.min(1, "At least one image is required").required("Images are required");
        }),
        existingImages: yup.array().default([]),
        brand: yup
            .number()
            .required("Brand is a required field")
            .transform((value) => (isNaN(value) ? undefined : value)),
        sub_category: yup
            .number()
            .required("Sub Category is a required field")
            .transform((value) => (isNaN(value) ? undefined : value)),
        pros: yup
            .array()
            .of(
                yup
                    .object()
                    .shape({ id : yup.number(),value: yup.string().required("Pro cannot be empty") })
            )
            .min(1, "At least one pro is required"),
        cons: yup
            .array()
            .of(
                yup
                    .object()
                    .shape({ id : yup.number(),value: yup.string().required("Con cannot be empty") })
            )
            .min(1, "At least one con is required"),
        meta_title: yup.string().required("Meta Title is a required field"),
        meta_keywords: yup.string().required("Meta Keywords is a required field"),
        meta_description: yup
            .string()
            .required("Meta Description is a required field"),
    })
    .required();

export const variantCreateUpdateSchema = yup
    .object({
        name: yup.string().required("Name is a required field"),
        heading: yup.string().required("Heading is a required field"),
        description: yup.string().required("Short Description is a required field"),
        content: yup.string().required("Content is a required field"),
        images: yup
            .array()
            .of(
                yup
                    .mixed()
                    .test("fileSize", "File size too large (Max 5MB)", (file) =>
                        file ? (file as File).size <= MAX_FILE_SIZE : true
                    )
                    .test(
                        "fileFormat",
                        "Unsupported format (JPEG, PNG, GIF only)",
                        (file) =>
                            file ? SUPPORTED_FORMATS.includes((file as File).type) : true
                    )
            )
            .when(["$isUpdate", "existingImages"], ([isUpdate, existingImages], schema) => {
                return isUpdate[0] || (Array.isArray(existingImages) && existingImages.length > 0)
                    ? schema
                    : schema.min(1, "At least one image is required").required("Images are required");
            }),
        existingImages: yup.array().default([]),
        // colors: yup.array().default([]),
        colors: yup
            .array()
            .of(
                yup
                    .object()
                    .shape({ name: yup.string().required("Color Name cannot be empty"),hex: yup.string().required("Please select color") })
            )
            .min(1, "At least one color is required"),
        price: yup
            .number()
            .typeError("Price must be a number") // Ensure the input is a number
            .integer("Price must be an integer") // Ensure the year is an integer
            .required("Price is a required field"),
        brand: yup
            .number()
            .required("Brand is a required field")
            .transform((value) => (isNaN(value) ? undefined : value)),
        model: yup
            .number()
            .required("Model is a required field")
            .transform((value) => (isNaN(value) ? undefined : value)),
        year: yup
            .number()
            .typeError("Year must be a number") // Ensure the input is a number
            .integer("Year must be an integer") // Ensure the year is an integer
            .min(1900, "Year must be at least 1900") // Minimum year
            .max(
                new Date().getFullYear(),
                `Year cannot be greater than ${new Date().getFullYear()}`
            ) // Maximum year (current year)
            .required("Year is required"), // Ensure the field is not empty
        meta_title: yup.string().required("Meta Title is a required field"),
        meta_keywords: yup.string().required("Meta Keywords is a required field"),
        meta_description: yup
            .string()
            .required("Meta Description is a required field"),
        transmission: yup
            .string()
            .oneOf<TransmissionEnum>(
                Object.values(TransmissionEnum) as TransmissionEnum[]
            )
            .required("Transmission is a required field"),
        fuel_type: yup
            .string()
            .oneOf<FuelTypeEnum>(Object.values(FuelTypeEnum) as FuelTypeEnum[])
            .required("Fuel Type is a required field"),
        mileage_from: yup
            .number()
            .required("Mileage is a required field")
            .min(1, "Mileage must be greater than 0"),
        mileage_to: yup
            .number()
            .required("Mileage is a required field")
            .test("mileage-to-greater", function (value) {
                const { mileage_from } = this.parent;
                return (
                    value > mileage_from ||
                    this.createError({
                        message: `Mileage must be greater than ${mileage_from}`,
                    })
                );
            }),
        cc: yup
            .number()
            .required("CC is a required field")
            .min(1, "CC must be greater than 0"),
    })
    .required();

export const blogCreateUpdateSchema = yup
    .object({
        title: yup.string().required("Title is a required field"),
        content: yup.string().required("Content is a required field"),
        images: yup
            .array()
            .of(
                yup
                    .mixed()
                    .test("fileSize", "File size too large (Max 5MB)", (file) =>
                        file ? (file as File).size <= MAX_FILE_SIZE : true
                    )
                    .test(
                        "fileFormat",
                        "Unsupported format (JPEG, PNG, GIF only)",
                        (file) =>
                            file ? SUPPORTED_FORMATS.includes((file as File).type) : true
                    )
            )
            .when(["$isUpdate", "existingImages"], ([isUpdate, existingImages], schema) => {
                return isUpdate[0] || (Array.isArray(existingImages) && existingImages.length > 0)
                    ? schema
                    : schema.min(1, "At least one image is required").required("Images are required");
            }),
        existingImages: yup.array().default([]),
        model: yup
            .number()
            .required("Model is a required field")
            .transform((value) => (isNaN(value) ? undefined : value)),
        author: yup
            .number()
            .required("Author is a required field")
            .transform((value) => (isNaN(value) ? undefined : value)),
        slug: yup
            .string()
            .transform((value) => value?.toLowerCase().replace(/\s+/g, "-") || ""),
        published_at: yup
            .date()
            .typeError("Invalid date format")
            .min(new Date(), "Date must be in the future")
            .required("Date and time are required"),
        pros: yup
            .array()
            .of(
                yup
                    .object()
                    .shape({ value: yup.string().required("Pro cannot be empty") })
            )
            .min(1, "At least one pro is required"),
        cons: yup
            .array()
            .of(
                yup
                    .object()
                    .shape({ value: yup.string().required("Con cannot be empty") })
            )
            .min(1, "At least one con is required"),
        tags: yup
            .array()
            .of(
                yup
                    .object()
                    .shape({ value: yup.string().required("Tag cannot be empty") })
            )
            .min(1, "At least one tag is required"),
        meta_title: yup.string().required("Meta Title is a required field"),
        meta_keywords: yup.string().required("Meta Keywords is a required field"),
        meta_description: yup
            .string()
            .required("Meta Description is a required field"),
    })
    .required();


export const bannerCreateUpdateSchema = yup
.object({
    brand: yup
      .number()
      .required("Brand is a required field")
      .transform((value) => (isNaN(value) ? undefined : value)),

    model: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? undefined : value)),

    variant: yup
      .number()
      .nullable()
      .transform((value) => (isNaN(value) ? undefined : value)),
})
.required();
