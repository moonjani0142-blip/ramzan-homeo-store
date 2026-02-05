import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Pill, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await login(formData.email, formData.password)
    
    if (result.success) {
      if (result.user.role === 'admin' || result.user.role === 'main_admin' || result.user.role === 'sub_admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/user/dashboard')
      }
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Pill className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Ramzan Homeo</h1>
              <p className="text-primary-100 text-sm">Store & Clinic</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8 border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                Life saving<br />Homeopathic Medicine
              </h2>
              <p className="text-xl text-primary-100 font-medium">
                YOUR HEALTH IS OUR PRIORITY
              </p>
            </div>

            <div className="space-y-3 text-white/90">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                <p className="text-sm">Faisal Bazaar Faqirwali</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                <p className="text-sm">Tehsil Haroonabad, Dist. Bahawalnagar</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                <p className="text-sm">0305-3253108, 0306-8436142</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-accent-400 rounded-full"></div>
                <p className="text-sm">Ramzanhomeostoreclinic@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-primary-100 text-sm">
            © 2026 Ramzan Homeo. Store & Clinic. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-4">
              <Pill className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Ramzan Homeo</h1>
            <p className="text-gray-600">Store & Clinic</p>
          </div>

          <div className="card-modern p-8 space-y-6 animate-slide-up">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back
              </h2>
              <p className="text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start space-x-3 animate-fade-in">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Error</p>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-modern pl-12"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input-modern pl-12"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="spinner border-white" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">
                  Register here
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center mt-6 text-sm text-gray-500">
            Protected by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  )
}
