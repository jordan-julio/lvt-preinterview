'use strict'

const Job = use('App/Models/Job')

class JobController {
  async index ({ request, response }) {
    const jobs = await Job.query().fetch()

    return response.json(jobs)
  }

  async store ({ request, response }) {
    const data = request.only([
      'first_name',
      'last_name',
      'phone_number',
      'email',
      'address',
      'postcode',
      'state',
      'clothing_type',
      'description',
      'budget'
    ])

    const job = await Job.create(data)

    return response.status(201).json(job)
  }

  async show ({ params, response }) {
    const job = await Job.find(params.id)

    if (!job) {
      return response.status(404).json({ message: 'Job not found' })
    }

    return response.json(job)
  }

  async update ({ params, request, response }) {
    const job = await Job.find(params.id)

    if (!job) {
      return response.status(404).json({ message: 'Job not found' })
    }

    const data = request.only([
      'first_name',
      'last_name',
      'phone_number',
      'email',
      'address',
      'postcode',
      'state',
      'clothing_type',
      'description',
      'budget'
    ])

    job.merge(data)
    await job.save()

    return response.json(job)
  }

  async destroy ({ params, response }) {
    const job = await Job.find(params.id)

    if (!job) {
      return response.status(404).json({ message: 'Job not found' })
    }

    await job.delete()

    return response.json({ message: 'Job deleted' })
  }
}

module.exports = JobController
