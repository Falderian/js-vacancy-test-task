import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, FileInput, Flex, Image, LoadingOverlay, Stack, Text, TextInput } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';

import { accountApi } from 'resources/account';
import { CreateProductData, useCreateProduct } from 'resources/product/product.api';

const NewProduct = () => {
  const { data: account } = accountApi.useGet();
  const router = useRouter();
  const upload = useCreateProduct();
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(null);
  const { control, handleSubmit } = useForm<CreateProductData>({
    defaultValues: {
      title: '',
      price: 0,
      image: undefined,
    },
  });

  const submit = async (data: CreateProductData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('userId', account!._id);
    formData.append('price', data.price.toString());
    if (data.image) formData.append('image', data.image);

    upload
      .mutateAsync(formData)
      .then(() => router.push('/tabs/your-products'))
      .catch((e) => console.warn(e));
  };

  return (
    <Stack w="50%" maw={500}>
      <Text size="lg" fw={600}>
        Create new product
      </Text>
      <LoadingOverlay visible={upload.isPending} />
      <form onSubmit={handleSubmit(submit)} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Flex gap={10} align="center">
          {imagePreview ? (
            <Image src={imagePreview as string} alt="Image preview" maw={230} mah={230} />
          ) : (
            <Image src="/images/default_image.svg" alt="Default" maw={230} mah={230} />
          )}

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <FileInput
                placeholder="Upload photo"
                onChange={(file) => {
                  field.onChange(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => setImagePreview(reader.result);
                    reader.readAsDataURL(file);
                  } else setImagePreview(null);
                }}
              />
            )}
          />
        </Flex>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <TextInput
              {...field}
              required
              label="Title of the product"
              placeholder="Enter title of the product..."
              error={upload.isError && (upload?.error as any).data.errors.title}
            />
          )}
        />
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <TextInput
              type="number"
              {...field}
              required
              label="Price"
              placeholder="Enter price of the product"
              leftSection="$"
            />
          )}
        />
        <Button type="submit" maw={200} style={{ alignSelf: 'flex-end' }}>
          Upload Product
        </Button>
      </form>
    </Stack>
  );
};

export default NewProduct;
