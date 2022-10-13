import React, { useContext } from 'react'
import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Box, Input, Flex, Avatar, useDisclosure, cookieStorageManager } from "@chakra-ui/react";
import { getCroppedImg, convertUrlToFile } from './canvasUtils';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/apiClient';


export function CropperAvatarProfile(props) {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { setProfileUser, user } = useContext(AuthContext);


  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [imageSrc, setImageSrc] = useState(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)
  const [rotation, setRotation] = useState(0)

  const handleCloseModal = () => {
    setImageSrc(null)
    setCroppedImage(null);
    onClose();

    const input: HTMLInputElement = document.querySelector("#input_upload_avatar")
    input.value = null;

  }

  // const showCroppedImage = useCallback(async () => {
  //   try {
  //     const croppedImageUrl = await getCroppedImg(
  //       imageSrc,
  //       croppedAreaPixels,
  //       rotation
  //     )

  //     const croppedImageFile = await convertUrlToFile(croppedImageUrl);
  //     console.log('donee', { croppedImageFile })

  //     setCroppedImage(croppedImageFile)
  //   } catch (error) {
  //     console.error(e)
  //   }
  // }, [imageSrc, croppedAreaPixels, rotation])




  const handleSubmit = useCallback(async () => {
    try {
      const croppedImageUrl = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )

      const croppedImageFile = await convertUrlToFile(croppedImageUrl);

      setCroppedImage(croppedImageFile)

      const file = croppedImageFile;

      let data = new FormData();

      data.append("avatar", file, file.name);

      const response = await api.patch("/users/avatar", data, {
        headers: {
          "Content-Type": "multipart/form-data; boundary=MyBoundary"
        },
      });

      handleCloseModal();
      setProfileUser();

    } catch (error) {
      console.error(error)
    }
  }, [imageSrc, croppedAreaPixels, rotation])


  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])



  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      let imageDataUrl = await readFile(file)

      // apply rotation if needed
      // const orientation = await getOrientation(file)
      // const rotation = ORIENTATION_TO_ANGLE[orientation]
      // if (rotation) {
      //   imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
      // }

      setImageSrc(imageDataUrl)
      onOpen();
    }
  }


  const handleClickImage = async () => {
    const input: HTMLElement = document.querySelector("#input_upload_avatar");
    input.click();
  }


  return (

    <Box>
      <Box>
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color="gray.900">Ajustar imagem</ModalHeader>
            <ModalCloseButton color="gray.900" />
            <ModalBody>
              <Box
                mx="auto"
                width="22rem"
                height="22rem"
                position="relative"
              >
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  showGrid={true}
                  aspect={4 / 3}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom} />
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                color="gray.700"
                variant="ghost"
                mr={3}
                onClick={handleCloseModal}
                _hover={{ bgColor: "none" }}
              >
                Cancelar
              </Button>
              <Button
                bg='pink.500'
                mr={3}
                onClick={handleSubmit}
                _hover={{
                  bgColor: "pink.400"
                }}
              >
                Enviar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box >

      <Flex justify="center" mb="6">

        <Box>
          <Box>
            <Input
              id="input_upload_avatar"
              name="avatar"
              type="file"
              accept="image/png, image/jpeg, image/pjpeg, image/jpg"
              hidden={true}
              onChange={onFileChange}
            />
          </Box>


          <Box role="button" onClick={handleClickImage}>

            <Flex justify="center">
              <Avatar
                w={["8rem", "12.5rem"]}
                h={["8rem", "12.5rem"]}
                size="xl"
                name={`${user?.name} ${user?.lastname}`}
                src={user?.avatar} />
            </Flex>

            <Box color="blue.500" mt="1" fontSize={18} textAlign="center"
            >
              Atualizar foto de perfil
            </Box>
          </Box>

        </Box>
      </Flex>

    </Box>


  )



}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })
}