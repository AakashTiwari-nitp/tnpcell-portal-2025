import Layout from '@/components/student/Layout'
import { API_URL } from '@/config/index'
import { parseCookies } from '@/helpers/index'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function ResetPasswordStudent({ token = '' }) {
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (new_pass !== confirm_pass) {
      toast.error('Passwords do not match')
    }
    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        old_pass,
        new_pass,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      toast.success('Password changed successfully')
    } else {
      if (res.status === 403) {
        toast.error('Old password is incorrect')
      }
      toast.error('Password change failed')
    }
  }
  const [old_pass, setOldPass] = useState('')
  const [new_pass, setNewPass] = useState('')
  const [confirm_pass, setConfirmPass] = useState('')
  return (
    <Layout heading='Reset Password'>
      <form onSubmit={handleSubmit}>
        <div className='space-y-6 mt-4 h-screen grid place-items-center'>
          <div className='bg-white shadow-lg px-4 py-5 sm:rounded-lg sm:p-6 lg:w-1/2'>
            <div className=''>
              <div className='py-4'>
                <h3 className='text-lg font-medium leading-6 text-gray-900'>
                  Enter Details
                </h3>
                <p className='mt-1 text-sm text-gray-500'></p>
              </div>
              <div className='mt-5 md:mt-0 md:col-span-2'>
                <div className='grid grid-cols-3 gap-6'>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='old_pass'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Old Password
                    </label>
                    <input
                      value={old_pass}
                      onChange={(e) => setOldPass(e.target.value)}
                      type='password'
                      name='old_pass'
                      id='old_pass'
                      autoComplete='password'
                      required
                      className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300 '
                    />
                  </div>

                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='new_pass'
                      className='block text-sm font-medium text-gray-700'
                    >
                      New Password
                      <small className='block'>
                        Must contain at least one number and one uppercase and
                        lowercase letter, and least 8 characters
                      </small>
                    </label>
                    <input
                      value={new_pass}
                      onChange={(e) => setNewPass(e.target.value)}
                      type='password'
                      name='new_pass'
                      id='new_pass'
                      pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                      autoComplete=''
                      required
                      className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full shadow-sm sm:text-sm border-gray-300'
                    />
                  </div>
                  <div className='col-span-6 sm:col-span-3'>
                    <label
                      htmlFor='confirm_pass'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Confirm New Password
                    </label>
                    <input
                      value={confirm_pass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      type='password'
                      name='confirm_pass'
                      id='confirm_pass'
                      pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                      autoComplete=''
                      required
                      className='mt-1 focus:ring-yellow-500 focus:border-yellow-500 block w-full sm:text-sm border-gray-300 '
                    />
                  </div>
                </div>
              </div>
            </div>
          <div className='m-5 grid'>
            <button
              type='submit'
              className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500  shadow-lg shadow-yellow-400/100 justify-self-end'
            >
              Change Password
            </button>
          </div>
          </div>
        </div>
      </form>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  return {
    props: { token: token }, // will be passed to the page component as props
  }
}
