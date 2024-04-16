import React, { useState } from "react";
import { Box, Heading, Text, Image, VStack, HStack, Button, Input, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaArrowUp } from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "Product 1",
    description: "This is the first product",
    upvotes: 10,
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJvZHVjdHxlbnwwfHx8fDE3MTMyNjI2NTR8MA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: 2,
    name: "Product 2",
    description: "This is the second product",
    upvotes: 15,
    image: "https://images.unsplash.com/photo-1697636979792-fb057f6cbe8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZ2FkZ2V0fGVufDB8fHx8MTcxMzI2MjY1NXww&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const Index = () => {
  const [productList, setProductList] = useState(products);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: "",
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.image) {
      setProductList([
        ...productList,
        {
          ...newProduct,
          id: productList.length + 1,
          upvotes: 0,
        },
      ]);
      setNewProduct({ name: "", description: "", image: "" });
    } else {
      toast({
        title: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const upvoteProduct = (id) => {
    setProductList(productList.map((product) => (product.id === id ? { ...product, upvotes: product.upvotes + 1 } : product)));
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <Heading as="h1" size="xl" textAlign="center" marginBottom={8}>
        ProductHunt Clone
      </Heading>
      <VStack spacing={8} align="stretch">
        {productList.map((product) => (
          <Box key={product.id} borderWidth={1} borderRadius="lg" padding={4}>
            <HStack spacing={4}>
              <Image src={product.image} alt={product.name} boxSize="100px" objectFit="cover" />
              <Box>
                <Heading as="h2" size="lg">
                  {product.name}
                </Heading>
                <Text>{product.description}</Text>
              </Box>
              <Box marginLeft="auto">
                <IconButton icon={<FaArrowUp />} onClick={() => upvoteProduct(product.id)} aria-label="Upvote" />
                <Text textAlign="center">{product.upvotes}</Text>
              </Box>
            </HStack>
          </Box>
        ))}
      </VStack>
      <Box marginTop={8}>
        <Heading as="h2" size="lg" marginBottom={4}>
          Add a new product
        </Heading>
        <VStack spacing={4} align="stretch">
          <Input name="name" placeholder="Product name" value={newProduct.name} onChange={handleInputChange} />
          <Input name="description" placeholder="Product description" value={newProduct.description} onChange={handleInputChange} />
          <Input name="image" placeholder="Image URL" value={newProduct.image} onChange={handleInputChange} />
          <Button leftIcon={<FaPlus />} onClick={addProduct}>
            Add Product
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Index;
