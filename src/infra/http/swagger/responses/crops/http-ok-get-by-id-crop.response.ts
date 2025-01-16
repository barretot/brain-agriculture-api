export const CropGetByIdSchema = {
  description: 'Get crop by id',
  schema: {
    example: {
      statusCode: 201,
      crop: {
        farm: {
          id: 'f0b1ddaf-ec62-4ded-a315-91733fb71b61',
          name: 'Fazenda Família Doe 2',
          harvests: [
            {
              id: 'd00b62c8-bf3d-4980-a830-cf12c987cb23',
              year: '2004',
              crops: [
                {
                  id: '5c4c6225-045e-437d-b8f9-21281cb177e9',
                  name: 'Feijao',
                  area: 3000,
                  createdAt: '2025-01-16T17:25:20.566Z',
                },
              ],
            },
          ],
        },
      },
    },
  },
};
