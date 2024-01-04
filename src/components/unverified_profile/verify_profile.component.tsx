import React, { useEffect, useState } from 'react';
import { NavLink as ReactRouterLink } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Stack,
  Heading,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  FormControl,
  InputGroup,
  Input,
  InputRightElement,
  FormErrorMessage,
  Textarea,
  RadioGroup,
  Radio,
  FormLabel,
  Checkbox,
  Link,
  useToast,
} from '@chakra-ui/react';

import { Dropdown } from 'primereact/dropdown';

import { axiosInstance } from '../../axios';

import { getResponseMessage } from '../../helpers/response.util';

type Inputs = {
  name: string | null;
  surname: string | null;
  picture: any;
  gender: string | null;
  description: string | null;
  city: string | null;
  specialties: string | null;
  degree: string | null;
  school: string | null;
  university: string | null;
  agreeToConditions: boolean;
  experience: string | null;
};
export default function VerifyProfileComponent({ setShowForm }: { setShowForm: any }) {
  const toast = useToast();
  const [gender, setGender] = useState(null);
  const [degree, setDegree] = useState(null);
  const [experience, setExperience] = useState('no');
  const [city, setCity] = useState(null);
  const [cities, setCities] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: null,
      surname: null,
      gender: null,
      description: null,
      picture: null,
      city: null,
      specialties: null,
      degree: null,
      school: null,
      university: null,
      experience: 'no',
      agreeToConditions: false,
    },
  });

  const getData = async () => {
    try {
      const res = await axiosInstance.get(`/users/verifyTeacher/form`);
      const citiesObj = Object.assign(res.data?.cities?.map(key => ({ name: key, value: key })));
      setCities(citiesObj);
    } catch (err) {
      toast({
        title: getResponseMessage(err),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  const onSubmit: SubmitHandler<any> = async data => {
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Stack w={{ base: 'full', xl: '60vw' }} spacing={10}>
      <Stack spacing={8} w={'full'}>
        <Breadcrumb fontSize={{ base: 14, md: 18 }} cursor={'default'}>
          <BreadcrumbItem _hover={{ textDecoration: 'none', cursor: 'default' }} cursor={'default'}>
            <BreadcrumbLink textDecoration={'none'} cursor={'default'}>
              Начало
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem color={'purple.500'} _hover={{ textDecoration: 'none' }} cursor={'default'}>
            <BreadcrumbLink textDecoration={'none'}>Верификация на профила</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack mb={10} spacing={{ base: 10, lg: 16 }} fontSize={{ base: 14, md: 18 }}>
          <Stack spacing={8}>
            <Heading flex={1} textAlign={'left'} fontSize={{ base: 20, lg: 26, xl: 28 }} color={'grey.600'}>
              Верификация на профила
            </Heading>

            <Text color={'grey.400'}>
              Lorem ipsum dolor sit amet, ut quidam nostrud eos. Id sed legendos definitiones, te eam philosophia
              disputationi, feugiat feugait ullamcorper duo an. Meis maiestatis vis cu. Nam facete tacimates perpetua
              in, graece causae ne mel. Dolore animal ponderum an per. Mei oporteat evertitur abhorreant an, unum nostro
              conclusionemque nam eu.
            </Text>
          </Stack>

          <Stack spacing={8} w={{ base: 'full', xl: '40vw' }}>
            <Heading flex={1} textAlign={'left'} fontSize={{ base: 20, lg: 26, xl: 28 }} color={'purple.500'}>
              Лична информация
            </Heading>

            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 8, lg: 12 }}>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel fontWeight={700} color={'grey.600'} pb={2}>
                  Име{' '}
                  <Text as={'span'} color={'red'}>
                    *
                  </Text>
                </FormLabel>

                <Input
                  size={{ base: 'sm', lg: 'md' }}
                  bg={'grey.100'}
                  rounded={'md'}
                  pr="4.5rem"
                  type="text"
                  placeholder="Вашето име"
                  maxLength={50}
                  {...register('name', { required: 'Полето е задължително' })}
                />

                <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.surname}>
                <FormLabel fontWeight={700} color={'grey.600'} pb={2}>
                  Фамилия{' '}
                  <Text as={'span'} color={'red'}>
                    *
                  </Text>
                </FormLabel>

                <Input
                  size={{ base: 'sm', lg: 'md' }}
                  bg={'grey.100'}
                  rounded={'md'}
                  pr="4.5rem"
                  type="text"
                  placeholder="Вашето презиме"
                  maxLength={100}
                  {...register('surname', { required: 'Полето е задължително' })}
                />

                <FormErrorMessage>{errors?.surname?.message}</FormErrorMessage>
              </FormControl>
            </Stack>

            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.picture}>
                <FormLabel fontWeight={700} color={'grey.600'} pb={2}>
                  Профилна снимка{' '}
                  <Text as={'span'} color={'red'}>
                    *
                  </Text>
                </FormLabel>

                <Input
                  pr="4.5rem"
                  type="text"
                  placeholder="Български език за 8ми клас"
                  maxLength={100}
                  {...register('picture', { required: 'Полето е задължително' })}
                />

                <FormErrorMessage>{errors?.picture?.message}</FormErrorMessage>
              </FormControl>

              <Stack fontSize={{ base: 14, lg: 16 }}>
                <Text fontWeight={400} color={'grey.400'}>
                  Моля добавете ясна профилна снимка (5 MB)
                </Text>
                <Text fontWeight={400} color={'grey.400'}>
                  Допустими файлови формати .jpg .jpeg .png
                </Text>
              </Stack>
            </Stack>

            <FormControl isInvalid={!!errors.gender}>
              <FormLabel fontWeight={700} color={'grey.600'} pb={2}>
                Пол{' '}
                <Text as={'span'} color={'red'}>
                  *
                </Text>
              </FormLabel>

              <RadioGroup
                value={gender}
                defaultValue="60"
                onChange={e => {
                  setValue('gender', e);
                  setGender(e);
                }}>
                <Stack spacing={10} direction="row" align={'start'}>
                  <Radio size="lg" colorScheme="purple" value={'15'} bg={'grey.100'}>
                    <Text textAlign={'left'} fontSize={{ base: 14, lg: 16 }} color={'grey.500'}>
                      Жена
                    </Text>
                  </Radio>
                  <Radio size="lg" colorScheme="purple" value={'30'} bg={'grey.100'}>
                    <Text textAlign={'left'} fontSize={{ base: 14, lg: 16 }} color={'grey.500'}>
                      Мъж
                    </Text>
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>{errors?.gender?.message}</FormErrorMessage>
            </FormControl>

            <Stack>
              <FormControl isInvalid={!!errors.surname}>
                <FormLabel fontWeight={700} color={'grey.600'} pb={2}>
                  Населено място{' '}
                  <Text as={'span'} color={'red'}>
                    *
                  </Text>
                </FormLabel>

                <Dropdown
                  value={city}
                  onChange={e => {
                    setValue('city', e.value?.name, { shouldValidate: true });
                    setCity(e.value);
                  }}
                  options={cities}
                  optionLabel="name"
                  placeholder="Изберете предмет"
                  className={errors.city ? 'invalid-dropdown w-full' : 'p-invalid w-full'}
                  showClear
                />

                <FormErrorMessage>{errors?.city?.message}</FormErrorMessage>
              </FormControl>
              <Text fontSize={{ base: 14, lg: 16 }} fontWeight={400} color={'grey.400'}>
                Моля изберете населеното място, в което живеете в момента.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <FormControl isInvalid={!!errors?.description}>
                <FormLabel fontWeight={700} color={'grey.600'} pb={2}>
                  Описание на профила{' '}
                  <Text as={'span'} color={'red'}>
                    *
                  </Text>
                </FormLabel>
                <InputGroup size={{ base: 'sm', lg: 'md' }} bg={'grey.100'} rounded={'md'}>
                  <Textarea
                    pr="4.5rem"
                    maxLength={600}
                    resize={'none'}
                    rows={4}
                    {...register('description', { required: 'Полето е задължително' })}
                  />
                  <InputRightElement width="4.5rem" color={'grey.500'}>
                    {watch('description')?.length || 0}/600
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
              </FormControl>

              <Text fontSize={{ base: 14, lg: 16 }} fontWeight={400} color={'grey.400'}>
                Моля добавете кратко описание на себе си, с което ще с представяте пред учениците.
              </Text>
            </Stack>

            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.specialties}>
                <FormLabel fontWeight={700} color={'grey.600'} pb={2}>
                  Предмети/ Сфери на интерес{' '}
                  <Text as={'span'} color={'red'}>
                    *
                  </Text>
                </FormLabel>
                <InputGroup size={{ base: 'sm', lg: 'md' }} bg={'grey.100'} rounded={'md'}>
                  <Input
                    pr="4.5rem"
                    maxLength={200}
                    resize={'none'}
                    placeholder={'Въведете тук'}
                    {...register('specialties', { required: 'Въведете тук' })}
                  />
                  <InputRightElement width="4.5rem" color={'grey.500'}>
                    {watch('specialties')?.length || 0}/200
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors?.specialties?.message}</FormErrorMessage>
              </FormControl>

              <Text fontSize={{ base: 14, lg: 16 }} fontWeight={400} color={'grey.400'}>
                Моля добавете кратко описание на себе си, с което ще с представяте пред учениците.
              </Text>
            </Stack>
          </Stack>

          <Stack spacing={8} w={{ base: 'full', xl: '40vw' }}>
            <Heading flex={1} textAlign={'left'} fontSize={{ base: 20, lg: 26, xl: 28 }} color={'purple.500'}>
              Квалификация{' '}
            </Heading>

            <FormControl isInvalid={!!errors.degree}>
              <FormLabel fontWeight={700} color={'grey.600'} pb={2}>
                Най-висока образователна степен{' '}
                <Text as={'span'} color={'red'}>
                  *
                </Text>
              </FormLabel>

              <RadioGroup
                w={'100vw'}
                value={degree}
                defaultValue="60"
                onChange={e => {
                  setValue('degree', e);
                  setDegree(e);
                }}>
                <Stack spacing={10} direction={{ base: 'column', lg: 'row' }} align={'start'} flexWrap={'wrap'}>
                  <Radio size="lg" colorScheme="purple" value={'SECONDARY'} bg={'grey.100'}>
                    <Text textAlign={'left'} fontSize={{ base: 14, lg: 16 }} color={'grey.500'}>
                      Основно образование
                    </Text>
                  </Radio>
                  <Radio size="lg" colorScheme="purple" value={'HIGH_SCHOOL'} bg={'grey.100'}>
                    <Text textAlign={'left'} fontSize={{ base: 14, lg: 16 }} color={'grey.500'}>
                      Средно образование
                    </Text>
                  </Radio>
                  <Radio size="lg" colorScheme="purple" value={'BACHELOR'} bg={'grey.100'}>
                    <Text textAlign={'left'} fontSize={{ base: 14, lg: 16 }} color={'grey.500'}>
                      Бакалавър
                    </Text>
                  </Radio>
                  <Radio size="lg" colorScheme="purple" value={'MASTER'} bg={'grey.100'}>
                    <Text textAlign={'left'} fontSize={{ base: 14, lg: 16 }} color={'grey.500'}>
                      Магистър
                    </Text>
                  </Radio>
                  <Radio size="lg" colorScheme="purple" value={'PHD'} bg={'grey.100'}>
                    <Text textAlign={'left'} fontSize={{ base: 14, lg: 16 }} color={'grey.500'}>
                      Доктор
                    </Text>
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>{errors?.degree?.message}</FormErrorMessage>
            </FormControl>

            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.school}>
                <FormLabel fontWeight={700} color={'grey.600'} pb={2}>
                  Учебно заведение{' '}
                  <Text as={'span'} color={'red'}>
                    *
                  </Text>
                </FormLabel>
                <InputGroup size={{ base: 'sm', lg: 'md' }} bg={'grey.100'} rounded={'md'}>
                  <Input
                    pr="4.5rem"
                    maxLength={100}
                    resize={'none'}
                    placeholder={'Въведете тук'}
                    {...register('school', { required: 'Въведете тук' })}
                  />
                  <InputRightElement width="4.5rem" color={'grey.500'}>
                    {watch('school')?.length || 0}/100
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors?.school?.message}</FormErrorMessage>
              </FormControl>

              <Text fontSize={{ base: 14, lg: 16 }} fontWeight={400} color={'grey.400'}>
                Моля уточнете в кое учебно заведение (училище / униврситет / колеж) сте завършили
              </Text>
            </Stack>

            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.university}>
                <FormLabel fontWeight={700} color={'grey.600'} pb={2}>
                  Специалност{' '}
                  <Text as={'span'} color={'red'}>
                    *
                  </Text>
                </FormLabel>
                <InputGroup size={{ base: 'sm', lg: 'md' }} bg={'grey.100'} rounded={'md'}>
                  <Input
                    pr="4.5rem"
                    maxLength={100}
                    resize={'none'}
                    placeholder={'Въведете тук'}
                    {...register('university', { required: 'Въведете тук' })}
                  />
                  <InputRightElement width="4.5rem" color={'grey.500'}>
                    {watch('university')?.length || 0}/100
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors?.university?.message}</FormErrorMessage>
              </FormControl>

              <Text fontSize={{ base: 14, lg: 16 }} fontWeight={400} color={'grey.400'}>
                Моля уточнете специалността, която сте завършили
              </Text>
            </Stack>
          </Stack>

          <Stack spacing={8} w={{ base: 'full', xl: '40vw' }}>
            <Heading flex={1} textAlign={'left'} fontSize={{ base: 20, lg: 26, xl: 28 }} color={'purple.500'}>
              Опит{' '}
            </Heading>

            <FormControl isInvalid={!!errors.experience}>
              <FormLabel fontWeight={700} color={'grey.600'} pb={2}>
                Имам предходен опит като преподавател{' '}
                <Text as={'span'} color={'red'}>
                  *
                </Text>
              </FormLabel>

              <RadioGroup
                value={experience}
                defaultValue="60"
                onChange={e => {
                  setValue('experience', e);
                  setExperience(e);
                }}>
                <Stack spacing={10} direction="row" align={'start'}>
                  <Radio size="lg" colorScheme="purple" value={'yes'} bg={'grey.100'}>
                    <Text textAlign={'left'} fontSize={{ base: 14, lg: 16 }} color={'grey.500'}>
                      Да
                    </Text>
                  </Radio>
                  <Radio size="lg" colorScheme="purple" value={'no'} bg={'grey.100'}>
                    <Text textAlign={'left'} fontSize={{ base: 14, lg: 16 }} color={'grey.500'}>
                      Не
                    </Text>
                  </Radio>
                </Stack>
              </RadioGroup>
              <FormErrorMessage>{errors?.experience?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.agreeToConditions}>
              <Checkbox
                w={{ base: 'full', xl: '100vw' }}
                size={{ base: 'md', lg: 'lg' }}
                color={'grey.400'}
                {...register('agreeToConditions', {
                  required: 'Полето е задължително!',
                })}>
                <Text fontSize={{ base: 14, lg: 16 }} textAlign={'left'} pl={2}>
                  Съгласявам се с {''}
                  <Link as={ReactRouterLink} to={'/terms-of-use'} color={'purple.500'}>
                    Условията за преподаване{' '}
                  </Link>{' '}
                  и{' '}
                  <Link as={ReactRouterLink} to={'/personal-data-policy'} color={'purple.500'}>
                    Условията за поверителност на личните данни
                  </Link>{' '}
                  *
                </Text>
              </Checkbox>
            </FormControl>

            <Stack direction={{ base: 'row' }} justify={{ base: 'space-between' }} mt={10}>
              <Button
                type={'submit'}
                size={{ base: 'md' }}
                w={'fit-content'}
                px={{ base: 6, md: 16 }}
                py={0}
                bg={'purple.500'}
                color={'white'}
                fontSize={{ base: 14, lg: 16 }}
                fontWeight={700}
                _hover={{ opacity: '0.9' }}
                _focus={{ outline: 'none' }}
                _active={{ bg: 'purple.500' }}>
                Изпращане
              </Button>

              <Button
                size={{ base: 'md' }}
                w={'fit-content'}
                py={0}
                bg={'transparent'}
                color={'purple.500'}
                fontSize={16}
                fontWeight={700}
                _hover={{ opacity: '0.9' }}
                _focus={{ outline: 'none' }}
                _active={{ bg: 'purple.500' }}
                textAlign={'right'}
                onClick={() => {
                  setShowForm(false);
                  reset();
                }}>
                Отказ
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}