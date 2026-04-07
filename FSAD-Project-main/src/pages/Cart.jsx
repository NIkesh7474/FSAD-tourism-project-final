import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Trash2, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PaymentModal from '../components/PaymentModal';

export default function Cart() {
    const { cart, removeFromCart, clearCart, getCartTotal, currentUser, addBooking } = useContext(AppContext);
    const navigate = useNavigate();
    const [paymentItem, setPaymentItem] = React.useState(null);

    const handleCheckout = () => {
        if (!currentUser) {
            alert('Please sign in to checkout.');
            navigate('/auth');
            return;
        }
        // For cart checkout, we'll create a virtual item representing the cart
        const cartItem = {
            id: 'cart-checkout',
            name: `Cart Checkout (${cart.length} items)`,
            amount: getCartTotal()
        };
        setPaymentItem({ item: cartItem, type: 'cart' });
    };

    const handlePaymentSuccess = (item, type, amount) => {
        // Add bookings for all cart items
        cart.forEach(cartItem => {
            addBooking(cartItem.id.split('-')[1], cartItem.type, cartItem.amount);
        });
        alert(`Payment Successful! Your cart items have been booked.`);
        clearCart();
        setPaymentItem(null);
        navigate('/');
    };

    if (cart.length === 0) {
        return (
            <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your Cart is Empty</h2>
                <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Add some homestays or tourist places to get started!</p>
                <button onClick={() => navigate('/')} className="btn btn-primary">Browse Destinations</button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem' }}>Your Cart ({cart.length} items)</h2>
                <button onClick={clearCart} className="btn" style={{ color: '#dc2626', border: '1px solid #dc2626' }}>
                    Clear Cart
                </button>
            </div>

            <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                {cart.map(item => (
                    <div key={item.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1.5rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.75rem',
                        boxShadow: 'var(--shadow-sm)',
                        background: 'white'
                    }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>{item.name}</h3>
                            <p style={{ color: 'var(--text-light)', marginBottom: '0.25rem' }}>{item.location}</p>
                            <p style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>{item.type}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: 600, fontSize: '1.125rem', color: 'var(--primary-color)' }}>
                                ₹{item.amount}
                            </span>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="btn"
                                style={{ color: '#dc2626', border: '1px solid #dc2626', padding: '0.5rem' }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '0.75rem',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid #e5e7eb'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>Total:</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                        ₹{getCartTotal()}
                    </span>
                </div>
                <button
                    onClick={handleCheckout}
                    className="btn btn-primary"
                    style={{ width: '100%', padding: '1rem', fontSize: '1.125rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                    <CreditCard size={20} />
                    Proceed to Checkout
                </button>
            </div>

            {paymentItem && (
                <PaymentModal
                    item={paymentItem.item}
                    type={paymentItem.type}
                    onClose={() => setPaymentItem(null)}
                    onSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
}