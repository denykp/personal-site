export const urlToObject = async (image: string) => {
  const response = await fetch(image);
  // here image is url/location of image
  const blob = await response.blob();
  return new File([blob], "image.jpg", { type: blob.type });
};

export const builderFormData = (data: any) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (
      Array.isArray(value) &&
      value.every((item) => item instanceof File)
    ) {
      value.forEach((file) => {
        formData.append(key, file);
      });
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, String(item));
      });
    } else {
      formData.append(key, String(value));
    }
  });
  return formData;
};

export const getInitial = (name: string, length: number = 2) => {
  return name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, length)
    .toUpperCase();
};
