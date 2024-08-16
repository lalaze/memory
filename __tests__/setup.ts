import { beforeAll, beforeEach, expect, it, suite } from 'vitest'
import dbConnect from "@/utils/db"
const fs = require('fs')
const path = require('path')
import Cards from '@/models/cards'
import mongoose from 'mongoose'
import dayjs from 'dayjs'

export const todayCardId = '66b485fc6542ae3026d0f057'

export const testBookId = '66b485f7e73db8ef1fade69d'

const bucketName = 'uploads'

export const testFileName = 'alice.epub'

const testFilePath = path.resolve('__tests__/alice.epub')

beforeEach(async () => {
    // insert fakeData to test db

    const { bucket, client } = await dbConnect()

    await Cards.deleteMany()

    await (new Cards({
        _id: new mongoose.Types.ObjectId(todayCardId),
        email: process.env.TEST_EMAIL,
        title: 'today-card',
        content: '1111searchValue22222',
        nextDay: dayjs().format('YYYY-MM-DD'),
        time: 1
    })).save()

    const filesCollection = client.connection.collection(`${bucketName}.files`);
    const chunksCollection = client.connection.collection(`${bucketName}.chunks`);

    await filesCollection.deleteMany();
    await chunksCollection.deleteMany();

    const uploadStream = bucket.openUploadStream(testFileName);
    const fileStream = fs.createReadStream(testFilePath);

    fileStream.pipe(uploadStream)

})
