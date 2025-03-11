// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import type { Patient } from '../../types/patients';

// Fake delay to mock remote request
const later = (delay: number,) =>
    new Promise(resolve => setTimeout(resolve, delay));
    
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ patients: Patient[]}>
) {
  await later(500);
  res.status(200).json({
    patients: [
      {
        firstName: "Ellie-May",
        lastName: "Conner",
        id: "2593afce",
        dateOfBirth: "1931-02-07",
        dateOfRegistration: "2021-01-19",
        favoriteColor: "blue"
      },
      {
        firstName: "Alexis",
        lastName: "Stewart",
        id: "63ed7504",
        dateOfBirth: "1962-09-21",
        dateOfRegistration: "2021-07-01",
        favoriteColor: "red"
      },
      {
        firstName: "Kathleen",
        lastName: "Chambers",
        id: "520879ca",
        dateOfBirth: "1932-05-19",
        dateOfRegistration: "2021-08-06",
        favoriteColor: "yellow"
      },
      {
        firstName: "Ben",
        lastName: "Spears",
        id: "9b3412d8",
        dateOfBirth: "1951-05-17",
        dateOfRegistration: "2021-09-02",
        favoriteColor: "green"
      },
      {
        firstName: "Habib",
        lastName: "Duran",
        id: "622fa867",
        dateOfBirth: "1960-03-26",
        dateOfRegistration: "2021-09-15",
        favoriteColor: "red"
      }
    ]
  })
}
