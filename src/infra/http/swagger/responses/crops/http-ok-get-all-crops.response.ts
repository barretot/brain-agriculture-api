export const GetAllCropsSchema = {
  description: 'Get all crops success',
  schema: {
    example: {
      statusCode: 201,
      crops: [
        {
          id: '9739cb43-e078-4085-b7a9-1700dadeec4d',
          name: 'Fazenda Família Doe',
          harvests: [
            {
              id: '02a2b891-593c-4d47-bcc6-4a56fb756a8f',
              year: '2023',
              crops: [
                {
                  id: '056adfde-ca97-4e49-be88-54686d159357',
                  name: 'Soja',
                  area: 1000,
                },
                {
                  id: '7c3e667c-9a03-45aa-b32a-af082458317b',
                  name: 'Café',
                  area: 2000,
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
