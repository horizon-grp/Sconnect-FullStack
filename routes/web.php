<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ServiceSeekerController;
use App\Http\Controllers\ServiceProviderController;
use App\Http\Controllers\RecruiterController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ReportsController;
use App\Http\Controllers\IDVerificationController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\CustomerServiceController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\AdminDashboardController;


use Illuminate\Http\Request;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        // 'laravelVersion' => Application::VERSION,
        // 'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
});

Route::get('/email/verify', function () {
    return view('auth.verify-email');
})->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/login'); // Redirect to a suitable route after verification
})->middleware(['signed'])->name('verification.verify');

Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();

    return back()->with('message', 'Verification link sent!');
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/serviceSeeker/dashboard', [ServiceSeekerController::class, 'index'])->name('serviceSeeker.dashboard');
    Route::get('/serviceProvider/dashboard', [ServiceProviderController::class, 'index'])->name('serviceProvider.dashboard');
    Route::get('/recruiter/dashboard', [RecruiterController::class, 'index'])->name('recruiter.dashboard');

});

use App\Http\Controllers\ClientProfileController;

Route::get('client/profile', [ClientProfileController::class, 'show'])->name('profile.show');
Route::post('client/profile', [ClientProfileController::class, 'update'])->name('profile.update');
Route::get('/countries', [ClientProfileController::class, 'getCountries'])->name('countries');
Route::get('/cities', [ClientProfileController::class, 'getCities'])->name('cities');

use App\Http\Controllers\UserController;


Route::middleware(['auth'])->group(function () {
    Route::get('client/profile', [UserController::class, 'profile'])->name('profile');
    Route::get('/settings', [UserController::class, 'settings'])->name('settings');
    Route::post('/logout', [UserController::class, 'logout'])->name('logout');
});

use App\Http\Controllers\SettingsController;

Route::middleware(['auth'])->group(function () {
    Route::get('/settings', [SettingsController::class, 'edit'])->name('settings.edit');
    Route::get('/settings/get', [SettingsController::class, 'get'])->name('settings.get');
    Route::post('/settings/update', [SettingsController::class, 'update'])->name('settings.update');
});


Route::get('/booked-services-seeker', [BookingController::class, 'bookedServicesSeeker'])->name('booked.services.seeker');
Route::get('/booked-services-provider', [BookingController::class, 'bookedServicesProvider'])->name('booked.services.provider');
Route::post('/bookings/{booking}/pay', [BookingController::class, 'pay']);
Route::post('/bookings/{booking}/confirm', [BookingController::class, 'confirm']);


Route::middleware(['auth'])->group(function () {
    Route::get('/services', [ServiceController::class, 'index'])->name('services.index');
    Route::post('/services', [ServiceController::class, 'store'])->name('services.store');
    Route::put('/services/{id}', [ServiceController::class, 'update'])->name('services.update');
    Route::delete('/services/{id}', [ServiceController::class, 'destroy'])->name('services.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/serviceProvider/client-list', [ClientController::class, 'index'])->name('serviceProvider.clientList');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
    Route::post('/transactions/release/{transaction}', [TransactionController::class, 'release'])->name('transactions.release');
    Route::post('/transactions/cancel/{transaction}', [TransactionController::class, 'cancel'])->name('transactions.cancel');
});

Route::get('/service-seeker/appointments', [ServiceSeekerController::class, 'appointments']);
Route::post('/service-seeker/appointments', [ServiceSeekerController::class, 'storeAppointment']);


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('service-seeker/payments', [PaymentController::class, 'create'])->name('payment.create');
    Route::post('/service-seeker/payments', [PaymentController::class, 'store'])->name('payment.store');
    Route::post('/service-seeker/payments', [PaymentController::class, 'submitPayment'])->name('payment.submit');
    Route::post('/payment/stripe', [PaymentController::class, 'stripePayment'])->name('payment.stripe');
    Route::post('/payment/callback', [PaymentController::class, 'paymentCallback'])->name('payment.callback');
});


Route::middleware('auth')->group(function () {
    Route::get('/messages', [MessageController::class, 'index'])->name('messages.index');
    Route::get('/messages/{conversation}', [MessageController::class, 'show'])->name('messages.show');
    Route::post('/messages/{message}', [MessageController::class, 'store'])->name('messages.store');
});


Route::middleware('auth')->group(function () {
    Route::get('/messages', [MessageController::class, 'index']);
    Route::get('/messages/{user}', [MessageController::class, 'show']);
    Route::post('/messages', [MessageController::class, 'store']);
});

Route::get('/messages', function () {
    return Inertia::render('Messages');
});


Route::get('/serviceSeeker/Dashboard', [ServiceSeekerController::class, 'dashboard'])->name('serviceSeeker.dashboard');
Route::get('/serviceSeeker/Messages', [MessageController::class, 'client'])->name('serviceSeeker.messages');
Route::get('/bookedServices', [BookingController::class, 'bookings'])->name('bookedServices.index');
Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');
Route::get('/ServiceSeeker/reports', [ReportsController::class, 'seeker'])->name('ServiceSeeker.reports');



Route::get('/serviceSeeker/CustomerService', [CustomerServiceController::class, 'seeker'])->name('serviceSeeker.customerService');
Route::get('ServiceSeeker/customer-service', function () {
    return Inertia::render('CustomerService');
})->middleware(['auth']);
Route::middleware('auth:sanctum')->get('/chat/messages', [ChatController::class, 'index']);
Route::middleware('auth:sanctum')->post('/chat/messages', [ChatController::class, 'store']);

Route::middleware('auth')->group(function () {
    Route::get('/conversations', [ConversationController::class, 'index']);
    Route::get('/conversations/{conversation}', [ConversationController::class, 'show']);
    Route::post('/conversations/{conversation}/messages', [MessageController::class, 'store']);
});




Route::middleware(['auth'])->group(function () {
    Route::get('/reports', [ReportsController::class, 'index'])->name('reports.index');
    Route::post('/reports', [ReportsController::class, 'store'])->name('reports.store');
});


Route::post('/chat/send', [ChatController::class, 'sendMessage']);
Route::get('/chat/messages', [ChatController::class, 'fetchMessages']);
Route::post('/chat/typing', [ChatController::class, 'userTyping']);
Route::get('/customer-service', function () {
    return Inertia::render('CustomerService');
})->middleware(['auth']);


Route::get('/appointments', [AppointmentController::class, 'index'])->name('appointments.index');

Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/verifyID', [ProfileController::class, 'verifyID'])->name('profile.verifyID');
    Route::post('/profile/disable', [ProfileController::class, 'disable'])->name('profile.disable');
    Route::post('/profile/update-picture', [ProfileController::class, 'updatePicture'])->name('profile.updatePicture');
});




Route::middleware(['auth'])->group(function () {
    Route::post('/id-verification', [IDVerificationController::class, 'store'])->name('id.verification.store');
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');

    Route::get('/bookings', [BookingController::class, 'index'])->name('bookings.index');
    Route::post('/bookings/{booking}/accept', [BookingController::class, 'accept'])->name('bookings.accept');
    Route::post('/bookings/{booking}/reject', [BookingController::class, 'reject'])->name('bookings.reject');
});

Route::middleware(['admin'])->group(function () {
    Route::get('/admin/verifications', [IDVerificationController::class, 'index'])->name('admin.verifications.index');
    Route::post('/admin/verifications/{idVerification}/approve', [IDVerificationController::class, 'approve'])->name('admin.verifications.approve');
    Route::post('/admin/verifications/{idVerification}/reject', [IDVerificationController::class, 'reject'])->name('admin.verifications.reject');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/service-seeker', [ServiceSeekerController::class, 'index'])->name('service-seeker.dashboard');
    Route::get('/service-seeker/services/{id}', [ServiceSeekerController::class, 'show'])->name('service-seeker.services.show');
});

Route::post('/bookings', [BookingController::class, 'store'])->name('bookings.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/ServiceProvider/Bookings', [ServiceProviderController::class, 'bookings'])->name('provider.bookings');

});


require __DIR__.'/auth.php';

use App\Http\Controllers\Admin\ServiceController as AdminServiceController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\BookingController as AdminBookingController;
use App\Http\Controllers\Admin\AppointmentController as AdminAppointmentController;
use App\Http\Controllers\Admin\ReportController as AdminReportController;
use App\Http\Controllers\Admin\PaymentController as AdminPaymentController;
use App\Http\Controllers\Admin\TransactionController as AdminTransactionController;
use App\Http\Controllers\Admin\CustomerServiceController as AdminCustomerServiceController;
use App\Http\Controllers\Admin\VerificationController as AdminVerificationController;





    Route::get('/Admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');


Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/Admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');

    Route::resource('services', AdminServiceController::class);
    Route::resource('users', AdminUserController::class);
    Route::resource('bookings', AdminBookingController::class);
    Route::resource('appointments', AdminAppointmentController::class);
    Route::resource('reports', AdminReportController::class);
    Route::resource('payments', AdminPaymentController::class);
    Route::resource('transactions', AdminTransactionController::class);
    Route::get('customer-service', [AdminCustomerServiceController::class, 'index'])->name('customer-service.index');

    Route::get('verifications', [AdminVerificationController::class, 'index'])->name('verifications.index');
    Route::post('verifications/{verification}/approve', [AdminVerificationController::class, 'approve'])->name('verifications.approve');
    Route::post('verifications/{verification}/reject', [AdminVerificationController::class, 'reject'])->name('verifications.reject');

    // Route::get('login', [AdminAuthController::class, 'showLoginForm'])->name('login');
    // Route::post('login', [AdminAuthController::class, 'login'])->name('login.post');
    // Route::post('logout', [AdminAuthController::class, 'logout'])->name('logout');
});


Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);


Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('login', [AuthController::class, 'login'])->name('login.post');
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    // Route::resource('users', Admin\UserController::class);
    // Route::resource('bookings', Admin\BookingController::class);
    // Route::resource('appointments', Admin\AppointmentController::class);
    // // Other admin routes...
});