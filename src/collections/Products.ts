import type { CollectionConfig } from 'payload/types'
import { CustomRootCategoryComponent } from '../components/fields/rootCategorySelect/component'

export const Products: CollectionConfig = {
    slug: 'products', // Collection slug (used for API endpoints)
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            type: 'text', // Field type (text for name)
            name: 'name', // Field name
            label: 'Name', // Label displayed in the admin UI
            required: true, // Make the field mandatory
        },
        {
            type: 'text', // Field type (text for name)
            name: 'productCode', // Field name
            label: 'Product Code', // Label displayed in the admin UI
            required: true, // Make the field mandatory
        },
        {
            type: 'textarea', // Field type (text for name)
            name: 'description', // Field name
            maxLength: 600, label: 'Description', // Label displayed in the admin UI
            required: true, // Make the field mandatory
        },
        {
            name: 'productimage', // required
            type: 'upload', // required
            relationTo: 'media', // required
            required: true,
            admin: {

            }
        },
        {
            type: 'text', // Field type (text for name)
            name: 'videourl', // Field name
            label: 'Video URL', // Label displayed in the admin UI
            required: false, // Make the field mandatory
            maxLength: 250
        },
        {
            type: 'json', // Field type (text for name)
            name: 'specification', // Field name
            label: 'Specification', // Label displayed in the admin UI
            required: false, // Make the field mandatory
        },
        {
            type: 'relationship', // Field type for relationships
            name: 'parentcategoryref',
            label: 'Parent Category', // Label displayed in the admin UI
            relationTo: 'parentcategory',
        },
        {
            type: 'relationship', // Field type for relationships
            name: 'rootcategoryref',
            label: 'Root Category', // Label displayed in the admin UI
            relationTo: 'rootcategory',
            admin: {
                allowCreate: false,
                components: {
                    Field: CustomRootCategoryComponent,
                },
            },
            access: {
                update: () => false,
            },
        },
        {
            type: 'relationship', // Field type for relationships
            name: 'cityref',
            label: 'City', // Label displayed in the admin UI
            relationTo: 'city',
        },

        {
            type: 'relationship', // Field type for relationships
            name: 'createdBy',
            label: 'Created By', // Label displayed in the admin UI
            relationTo: 'users',
            admin: {
                allowCreate: false,
            },
            access: {
                update: () => false,
            },
        },
        {
            type: 'relationship', // Field type for relationships
            name: 'modifiedBy',
            label: 'Modified By', // Label displayed in the admin UI
            relationTo: 'users',
            // defaultValue: ({ user }) => user.id,
            admin: {
                allowCreate: false,
            },
            access: {
                update: () => false,
                create: () => false,
            },
            hooks: {
                afterChange: [
                    async ({ operation, req, data }) => {
                        if (operation === 'update') {
                            data.modifiedBy = req.user.id
                            return data
                        }
                    },
                ],
            },
        },
        {
            name: 'isDeleted',
            label: 'Deleted?',
            type: 'checkbox',
            defaultValue: false,
        },
    ],
}

export default Products
