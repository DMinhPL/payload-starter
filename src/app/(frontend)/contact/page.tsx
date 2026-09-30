import type { Metadata } from 'next/types'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { FormBlock } from '@/blocks/Form/Component'
import PageClient from './page.client'

const CONTACT_FORM_TITLE = 'Contact Form'

// Always read the latest form so edits made in the admin show up without a rebuild
export const dynamic = 'force-dynamic'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'forms',
    where: { title: { equals: CONTACT_FORM_TITLE } },
    limit: 1,
    depth: 1,
    pagination: false,
  })

  const form = docs[0]
  if (!form) notFound()

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-4">Contact</h1>
          <p className="mb-0">
            Have a question or a project in mind? Send us a message and we&apos;ll get back to you
            soon.
          </p>
        </div>
      </div>

      <FormBlock enableIntro={false} form={form as unknown as FormType} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Contact | Payload Website Template',
    description: 'Get in touch with us.',
  }
}
