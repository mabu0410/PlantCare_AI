import { useCaiDatStore } from '../store/cai_dat_store';

const vi = {
    // Tab Bar
    tab_trangchu: 'Trang chủ',
    tab_lichsu: 'Lịch sử',
    tab_thuvien: 'Thư viện',
    tab_taikhoan: 'Tài khoản',

    // Settings Screen
    cd_title: 'Cài đặt',
    cd_giaodien: 'GIAO DIỆN',
    cd_chedotoi: 'Chế độ tối',
    cd_ngonngu: 'Ngôn ngữ',
    cd_cochu: 'Cỡ chữ',
    cd_thongbao: 'THÔNG BÁO',
    cd_thongbaopush: 'Thông báo push',
    cd_emailthongbao: 'Email thông báo',
    cd_dulieu: 'DỮ LIỆU',
    cd_tudongsaoluu: 'Tự động sao lưu',
    cd_xoacache: 'Xóa cache',
    cd_thongtin: 'THÔNG TIN',
    cd_chinhsach: 'Chính sách bảo mật',
    cd_dieukhoan: 'Điều khoản sử dụng',
    cd_danhgia: 'Đánh giá ứng dụng',

    // Home Screen
    tc_xinchao: 'Xin chào, Nông dân! 👋',
    tc_phathien: 'Phát hiện bệnh cây trồng bằng AI',
    tc_chupanh: 'Chụp ảnh lá cây để nhận diện bệnh ngay lập tức 🔍',
    tc_quetngay: '🔍  Quét Bệnh Ngay',
    tc_solanquet: 'Số lần quét',
    tc_benhphathien: 'Bệnh phát hiện',
    tc_caydaluu: 'Cây đã lưu',
    tc_lanquet: 'Lần quét',
    tc_benh: 'Bệnh',
    tc_cayluu: 'Cây lưu',
    tc_doam: 'Độ ẩm',
    tc_thoitiet_canhbao: 'Điều kiện thuận lợi cho nấm phát triển',
    tc_lichsuganday: 'Lịch sử gần đây',
    tc_xemtatca: 'Xem tất cả →',
    tc_meo: 'Mẹo hôm nay 💡',

    // History Screen
    ls_xoa: 'Xóa',
    ls_huy: 'Hủy',
    ls_xoaban_ghi: 'Bạn muốn xóa bản ghi này?',
    ls_chuacols: 'Chưa có lịch sử',
    ls_batdauquet: 'Bắt đầu quét cây để xem kết quả ở đây',
    ls_tieude: 'Lịch sử quét 📋',
    ls_xoatatca: 'Xóa tất cả',
    ls_banchacchan: 'Bạn chắc chắn?',
    ls_ketqua: 'kết quả',
    ls_timkiem: 'Tìm kiếm bệnh hoặc loại cây...',

    // Library Screen
    tv_tieude: 'Thư viện cây trồng 📚',
    tv_loaicay: 'loại cây',
    tv_timkiem: 'Tìm kiếm cây trồng...',
    tv_khongtimthay: 'Không tìm thấy cây trồng',

    // Plant Detail Screen
    ctb_khongtimthay: 'Không tìm thấy dữ liệu',
    ctb_mota: '📝 Mô tả',
    ctb_benhthuonggap: '🦠 Bệnh thường gặp',
    ctb_huongdanchamsoc: '🌱 Hướng dẫn chăm sóc',
    ctb_hdcs_chitiet: 'Tưới nước đều đặn, bón phân NPK định kỳ 2 tuần/lần. Đảm bảo thoáng khí tốt và đủ ánh sáng. Kiểm tra sâu bệnh thường xuyên.',
    ctb_muavu: '📅 Mùa vụ',
    ctb_muavu_chitiet: 'Có thể trồng quanh năm ở vùng nhiệt đới. Mùa chính: tháng 2-5 và tháng 8-11. Tránh trồng trong mùa mưa lớn.',
    ctb_quetbenhcho: 'Quét bệnh cho',

    // Saved Screen
    dl_chualuu: 'Chưa lưu kết quả nào',
    dl_luuy_chualuu: 'Những kết quả phân tích bạn đã lưu sẽ hiển thị ở đây',
    dl_tieude: 'Đã lưu',

    // Privacy Policy Screen
    cs_tieude_chinh: 'Chính sách bảo mật',
    cs_capnhat: 'Cập nhật:',
    cs_tieude_1: '1. Thông tin chúng tôi thu thập',
    cs_noidung_1: 'PlantCare AI thu thập các thông tin sau khi bạn sử dụng ứng dụng:\n\n• Ảnh lá cây bạn chụp để phân tích (được xử lý cục bộ hoặc gửi lên server AI)\n• Thông tin tài khoản cơ bản (tên, email) khi đăng ký\n• Thống kê sử dụng ẩn danh để cải thiện trải nghiệm\n• Thông tin thiết bị (hệ điều hành, phiên bản app)',
    cs_tieude_2: '2. Cách chúng tôi sử dụng thông tin',
    cs_noidung_2: 'Thông tin của bạn được sử dụng để:\n\n• Cung cấp dịch vụ phát hiện bệnh cây trồng bằng AI\n• Lưu trữ lịch sử phân tích cho tài khoản của bạn\n• Cải thiện độ chính xác của mô hình AI\n• Gửi thông báo liên quan đến cây trồng và bệnh dịch theo mùa (nếu bạn bật)\n• Hỗ trợ kỹ thuật khi cần thiết',
    cs_tieude_3: '3. Chia sẻ dữ liệu',
    cs_noidung_3: 'Chúng tôi KHÔNG bán hoặc cho thuê thông tin cá nhân của bạn.\n\nChúng tôi có thể chia sẻ dữ liệu ẩn danh với:\n• Các đối tác nghiên cứu nông nghiệp (dữ liệu đã được ẩn danh hóa)\n• Nhà cung cấp dịch vụ cloud (lưu trữ bảo mật)\n• Cơ quan chức năng khi có yêu cầu pháp lý hợp lệ',
    cs_tieude_4: '4. Bảo mật dữ liệu',
    cs_noidung_4: 'Chúng tôi áp dụng các biện pháp bảo mật tiêu chuẩn ngành:\n\n• Mã hóa HTTPS cho mọi kết nối\n• Lưu trữ mật khẩu bằng bcrypt\n• Ảnh phân tích được xóa sau 30 ngày\n• Token xác thực có thời hạn ngắn',
    cs_tieude_5: '5. Quyền của bạn',
    cs_noidung_5: 'Bạn có quyền:\n\n• Xem, chỉnh sửa, hoặc xóa tài khoản bất kỳ lúc nào\n• Xuất toàn bộ dữ liệu của bạn\n• Yêu cầu xóa hoàn toàn khỏi hệ thống\n• Từ chối nhận thông báo\n• Gửi khiếu nại qua email hỗ trợ',
    cs_tieude_6: '6. Liên hệ',
    cs_noidung_6: 'Nếu bạn có câu hỏi về chính sách bảo mật, vui lòng liên hệ:\n\n📧 privacy@plantcare.ai\n🌐 www.plantcare.ai/privacy\n\nChúng tôi sẽ phản hồi trong vòng 72 giờ làm việc.',

    // Tutorial Screen
    hdq_tieude_chinh: 'Hướng dẫn quét',
    hdq_boqua: 'Bỏ qua',
    hdq_buoc: 'Bước',
    hdq_batdau: '🔍 Bắt đầu quét ngay',
    hdq_tieptheo: 'Tiếp theo →',
    hdq_b1_t: 'Chụp ảnh lá cây',
    hdq_b1_m: 'Đặt lá cây vào giữa khung hình. Đảm bảo lá chiếm ít nhất 70% diện tích ảnh để AI nhận diện chính xác hơn.',
    hdq_b1_meo: '💡 Chụp gần, rõ nét',
    hdq_b2_t: 'Đảm bảo đủ ánh sáng',
    hdq_b2_m: 'Chụp ngoài trời hoặc gần cửa sổ. Tránh bóng tối và ánh đèn flash trực tiếp gây chói ảnh.',
    hdq_b2_meo: '💡 Ánh sáng tự nhiên là tốt nhất',
    hdq_b3_t: 'Chụp vùng bệnh rõ ràng',
    hdq_b3_m: 'Tập trung vào phần lá có dấu hiệu bất thường như đốm, vết vàng, hay mốc. AI sẽ phân tích trong vài giây.',
    hdq_b3_meo: '💡 Chụp nhiều góc nếu cần',

    // Terms of Service Screen
    dk_tieude_chinh: 'Điều khoản sử dụng',
    dk_hieuluc: 'Hiệu lực:',
    dk_tieude_1: '1. Chấp nhận điều khoản',
    dk_noidung_1: 'Bằng cách tải xuống, cài đặt hoặc sử dụng PlantCare AI, bạn xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc bởi các điều khoản này. Nếu bạn không đồng ý, vui lòng không sử dụng ứng dụng.',
    dk_tieude_2: '2. Mục đích sử dụng',
    dk_noidung_2: 'PlantCare AI được phát triển dành cho mục đích:\n\n• Hỗ trợ nhận diện sơ bộ các bệnh phổ biến trên cây trồng\n• Cung cấp thông tin tham khảo về cách xử lý bệnh\n• Lưu trữ lịch sử theo dõi sức khỏe cây trồng\n\nỨng dụng KHÔNG thay thế tư vấn chuyên nghiệp từ kỹ sư nông nghiệp.',
    dk_tieude_3: '3. Giới hạn trách nhiệm',
    dk_noidung_3: 'Kết quả phân tích của AI là để tham khảo và có thể không chính xác 100%.\n\nChúng tôi không chịu trách nhiệm về:\n• Quyết định canh tác dựa trên kết quả phân tích\n• Thiệt hại mùa vụ do sử dụng sai thông tin\n• Sự cố kỹ thuật ngoài tầm kiểm soát',
    dk_tieude_4: '4. Quyền sở hữu trí tuệ',
    dk_noidung_4: 'Tất cả nội dung trong PlantCare AI bao gồm giao diện, mô hình AI, cơ sở dữ liệu bệnh cây, và tài liệu đều thuộc quyền sở hữu của PlantCare AI.\n\nBạn KHÔNG được sao chép, phân phối, hay thương mại hóa bất kỳ phần nào mà không có sự cho phép bằng văn bản.',
    dk_tieude_5: '5. Tài khoản người dùng',
    dk_noidung_5: 'Bạn có trách nhiệm:\n\n• Giữ bí mật mật khẩu tài khoản\n• Thông báo ngay nếu phát hiện hoạt động bất thường\n• Không chia sẻ tài khoản với người khác\n• Cung cấp thông tin chính xác khi đăng ký',
    dk_tieude_6: '6. Thay đổi dịch vụ',
    dk_noidung_6: 'Chúng tôi có quyền thay đổi, tạm dừng hoặc ngừng cung cấp dịch vụ vào bất kỳ lúc nào, có hoặc không có thông báo trước.\n\nCác thay đổi quan trọng sẽ được thông báo qua email hoặc thông báo trong ứng dụng.',

    // Feedback Screen
    ph_tieude_chinh: 'Phản hồi & Hỗ trợ',
    ph_hero_t: 'Giúp chúng tôi cải thiện',
    ph_hero_m: 'Mọi phản hồi đều quan trọng với chúng tôi',
    ph_loai_label: 'Loại phản hồi',
    ph_loai_bug: 'Báo lỗi',
    ph_loai_tinhnang: 'Yêu cầu tính năng',
    ph_loai_gopy: 'Góp ý UX',
    ph_loai_khac: 'Khác',
    ph_mota_label: 'Mô tả chi tiết',
    ph_mota_placeholder: 'Mô tả vấn đề hoặc ý kiến của bạn...',
    ph_email_label: 'Email liên lạc',
    ph_email_hint: '(không bắt buộc)',
    ph_email_placeholder: 'email@example.com',
    ph_nut_gui: 'Gửi phản hồi',
    ph_nut_danggui: 'Đang gửi...',
    ph_toast_loi_mota: 'Vui lòng nhập nội dung phản hồi',
    ph_toast_tc_t: 'Cảm ơn bạn đã góp ý! 🙏',
    ph_toast_tc_m: 'Chúng tôi sẽ xem xét trong 24-48 giờ',

    // Auth Screens (Login/Register)
    dn_chaomung: 'Chào mừng trở lại!',
    dn_tieptheo: 'Đăng nhập để tiếp tục',
    dn_email_label: 'Email',
    dn_email_placeholder: 'email@example.com',
    dn_matkhau_label: 'Mật khẩu',
    dn_matkhau_placeholder: '••••••••',
    dn_quenmatkhau: 'Quên mật khẩu?',
    dn_dang_dangnhap: 'Đang đăng nhập...',
    dn_dangnhap: 'Đăng nhập',
    dn_chuacotaikhoan: 'Chưa có tài khoản? ',
    dn_dangkyngay: 'Đăng ký ngay',
    dn_boqua: 'Bỏ qua đăng nhập →',

    dk_taotaikhoan: 'Tạo tài khoản 🌱',
    dk_batdaubaove: 'Bắt đầu bảo vệ cây trồng của bạn',
    dk_hovaten_label: 'Họ và tên',
    dk_hovaten_placeholder: 'Nguyễn Văn A',
    dk_email_label: 'Email',
    dk_email_placeholder: 'email@example.com',
    dk_matkhau_label: 'Mật khẩu',
    dk_matkhau_placeholder_min: 'Tối thiểu 6 ký tự',
    dk_dang_tao: 'Đang tạo...',
    dk_dangky: 'Đăng ký',
    dk_dacotaikhoan: 'Đã có tài khoản? ',
    dk_dangnhap: 'Đăng nhập',

    // About App Screen
    vud_tieude_chinh: 'Về ứng dụng',
    vud_phienban: 'Phiên bản',
    vud_sumenh_t: 'Sứ mệnh',
    vud_sumenh_m: 'PlantCare AI được phát triển với mục tiêu giúp bà con nông dân và những người yêu cây cảnh dễ dàng phát hiện bệnh tật trên cây trồng bằng trí tuệ nhân tạo, từ đó đưa ra các biện pháp xử lý kịp thời và hiệu quả nhất.',
    vud_lienhe_t: 'Liên hệ',
    vud_banquyen: '© 2026 PlantCare AI. Bảo lưu mọi quyền.',
    vud_lamvoi: 'Được làm với ❤️ tại Việt Nam',

    // Onboarding Screen
    ob_boqua: 'Bỏ qua',
    ob_s1_t: 'Chụp ảnh lá cây',
    ob_s1_m: 'Chụp hoặc tải ảnh lá cây bị bệnh lên ứng dụng để bắt đầu phân tích',
    ob_s2_t: 'AI Phân tích',
    ob_s2_m: 'Trí tuệ nhân tạo tự động nhận diện loại bệnh với độ chính xác cao',
    ob_s3_t: 'Nhận phác đồ điều trị',
    ob_s3_m: 'Hướng dẫn điều trị chi tiết và các biện pháp phòng ngừa hiệu quả',
    ob_batdau: 'Bắt đầu 🚀',
    ob_tieptheo: 'Tiếp theo',

    // Splash Screen
    sp_tagline: 'Phát hiện bệnh cây thông minh 🌿',

    // Notification Screen
    tb_tieude_chinh: 'Thông báo',
    tb_chuadoc: 'chưa đọc',
    tb_doctatca: 'Đọc tất cả',
    tb_trong_t: 'Chưa có thông báo',
    tb_trong_m: 'Các thông báo về bệnh cây và nhắc nhở sẽ xuất hiện tại đây',

    // Camera Screen
    cm_quyen_t: 'Quyền truy cập',
    cm_quyen_m: 'Cần quyền truy cập thư viện ảnh.',
    cm_huongdan: 'Đặt lá cây vào khung hình',
    cm_meo_anhsang: '💡 Đảm bảo đủ ánh sáng để tăng độ chính xác',

    // Preview Screen
    xta_tieude_chinh: 'Xác nhận ảnh',
    xta_anhdachup: 'Ảnh đã chụp',
    xta_cat: 'Cắt ✂️',
    xta_xoay: 'Xoay 🔄',
    xta_sang: 'Sáng ☀️',
    xta_meo_cat: 'Cắt sát vào vùng lá bị bệnh để tăng độ chính xác AI',
    xta_nut_chulai: 'Chụp lại',
    xta_nut_phantich: 'Phân tích ngay 🚀',

    // Account Screen
    tk_title: 'Hồ sơ của tôi',
    tk_dangxuat: 'Đăng xuất',
    tk_xacnhan_dx: 'Bạn có chắc chắn muốn đăng xuất không?',
    tk_huy: 'Hủy',
    tk_danhgia_t: 'Đánh giá ứng dụng',
    tk_danhgia_m: 'Bạn cảm thấy ứng dụng PlantCare AI như thế nào? Hãy chia sẻ ý kiến của bạn nhé!',
    tk_danhgia_nut: 'Đánh giá ngay',
    tk_daluu: 'Đã lưu',
    tk_thongbao: 'Thông báo',
    tk_trogiup: 'Trợ giúp',
    tk_phienban: 'Phiên bản mới nhất',

    // Result Screen
    kq_dang_xuly: 'Đang xử lý hình ảnh...',
    kq_trich_xuat: 'Trích xuất đặc điểm bệnh lý...',
    kq_doi_chieu: 'Đối chiếu cơ sở dữ liệu...',
    kq_hoan_thien: 'Hoàn thiện kết quả...',
    kq_tieude_chinh: 'Chi tiết kết quả',
    kq_do_chinh_xac: 'Độ chính xác',
    kq_muc_do: 'Mức độ',
    kq_tab_trieuchung: 'Triệu chứng',
    kq_tab_dieutri: 'Điều trị',
    kq_tab_phongngua: 'Phòng ngừa',
    kq_trong: 'Không phát hiện triệu chứng bất thường ✅',
    kq_nut_luu: '💾 Lưu',
    kq_nut_chia_se: '📤 Chia sẻ',
    kq_nut_quet_lai: '🔄 Quét lại',

    // Severity Levels
    muc_thap: 'Thấp',
    muc_trungbinh: 'Trung bình',
    muc_cao: 'Cao',
    muc_nghiemtrong: 'Nghiêm trọng',

    // Edit Profile Screen
    cshs_tieude_chinh: 'Chỉnh sửa hồ sơ',
    cshs_label_hoten: 'Họ và tên',
    cshs_placeholder_hoten: 'Nhập họ và tên',
    cshs_label_email: 'Email',
    cshs_placeholder_email: 'Nhập email',
    cshs_label_sdt: 'Số điện thoại',
    cshs_placeholder_sdt: 'Chưa cập nhật',
    cshs_dang_luu: 'Đang lưu...',
    cshs_luu_thay_doi: 'Lưu thay đổi',
    cshs_quyen_t: 'Cấp quyền',
    cshs_quyen_m: 'Ứng dụng cần quyền truy cập thư viện ảnh để thay đổi avatar.',

    // Modal
    chon_ngon_ngu: 'Chọn Ngôn ngữ',
    chon_co_chu: 'Chọn Cỡ chữ',
    btn_luu: 'Đã lưu thay đổi',
    tin_nhan_xoa_cache: 'Đã dọn dẹp bộ nhớ đệm thành công',
    xac_nhan_xoa: 'Xóa toàn bộ ảnh cache và dữ liệu tạm?',
    huy: 'Hủy',
    xoa: 'Xóa',

    // Font Sizes
    cc_nho: 'Nhỏ',
    cc_binh_thuong: 'Bình thường',
    cc_lon: 'Lớn',

    // Toasts & Messages
    toast_bat_thong_bao: 'Đã bật thông báo Push',
    toast_tat_thong_bao: 'Đã tắt thông báo Push',
    toast_dang_ky_email: 'Đã đăng ký nhận Email',
    toast_huy_email: 'Đã hủy nhận Email',
    toast_bat_sao_luu: 'Đã bật tự động sao lưu',
    toast_tat_sao_luu: 'Đã tắt tự động sao lưu',
};

const en = {
    // Tab Bar
    tab_trangchu: 'Home',
    tab_lichsu: 'History',
    tab_thuvien: 'Library',
    tab_taikhoan: 'Account',

    // Settings Screen
    cd_title: 'Settings',
    cd_giaodien: 'INTERFACE',
    cd_chedotoi: 'Dark Mode',
    cd_ngonngu: 'Language',
    cd_cochu: 'Font Size',
    cd_thongbao: 'NOTIFICATIONS',
    cd_thongbaopush: 'Push Notifications',
    cd_emailthongbao: 'Email Alerts',
    cd_dulieu: 'DATA',
    cd_tudongsaoluu: 'Auto Backup',
    cd_xoacache: 'Clear Cache',
    cd_thongtin: 'INFORMATION',
    cd_chinhsach: 'Privacy Policy',
    cd_dieukhoan: 'Terms of Service',
    cd_danhgia: 'Rate App',

    // Home Screen
    tc_xinchao: 'Hello, Farmer! 👋',
    tc_phathien: 'AI-powered Plant Disease Detection',
    tc_chupanh: 'Take a picture of a leaf for instant diagnosis 🔍',
    tc_quetngay: '🔍  Scan Now',
    tc_solanquet: 'Total Scans',
    tc_benhphathien: 'Diseases Found',
    tc_caydaluu: 'Saved Plants',
    tc_lanquet: 'Scans',
    tc_benh: 'Disease',
    tc_cayluu: 'Saved',
    tc_doam: 'Humidity',
    tc_thoitiet_canhbao: 'Favorable conditions for fungal growth',
    tc_lichsuganday: 'Recent History',
    tc_xemtatca: 'View all →',
    tc_meo: 'Daily Tip 💡',

    // History Screen
    ls_xoa: 'Delete',
    ls_huy: 'Cancel',
    ls_xoaban_ghi: 'Do you want to delete this record?',
    ls_chuacols: 'No history yet',
    ls_batdauquet: 'Start scanning plants to see results here',
    ls_tieude: 'Scan History 📋',
    ls_xoatatca: 'Delete All',
    ls_banchacchan: 'Are you sure?',
    ls_ketqua: 'results',
    ls_timkiem: 'Search for diseases or plant types...',

    // Library Screen
    tv_tieude: 'Plant Library 📚',
    tv_loaicay: 'plants',
    tv_timkiem: 'Search for plants...',
    tv_khongtimthay: 'No plants found',

    // Plant Detail Screen
    ctb_khongtimthay: 'Data not found',
    ctb_mota: '📝 Description',
    ctb_benhthuonggap: '🦠 Common Diseases',
    ctb_huongdanchamsoc: '🌱 Care Instructions',
    ctb_hdcs_chitiet: 'Water regularly, apply NPK fertilizer every 2 weeks. Ensure good ventilation and adequate light. Check for pests and diseases regularly.',
    ctb_muavu: '📅 Planting Season',
    ctb_muavu_chitiet: 'Can be planted year-round in tropical areas. Main season: Feb-May and Aug-Nov. Avoid planting during heavy rains.',
    ctb_quetbenhcho: 'Scan disease for',

    // Saved Screen
    dl_chualuu: 'No saved results',
    dl_luuy_chualuu: 'The analysis results you have saved will appear here',
    dl_tieude: 'Saved',

    // Privacy Policy Screen
    cs_tieude_chinh: 'Privacy Policy',
    cs_capnhat: 'Updated:',
    cs_tieude_1: '1. Information we collect',
    cs_noidung_1: 'PlantCare AI collects the following information when you use the app:\n\n• Images of plant leaves you take for analysis (processed locally or sent to AI server)\n• Basic account info (name, email) upon registration\n• Anonymous usage statistics to improve experience\n• Device information (OS, app version)',
    cs_tieude_2: '2. How we use your information',
    cs_noidung_2: 'Your information is used to:\n\n• Provide AI plant disease detection services\n• Store analysis history for your account\n• Improve AI model accuracy\n• Send seasonal plant disease notifications (if enabled)\n• Provide technical support when needed',
    cs_tieude_3: '3. Data sharing',
    cs_noidung_3: 'We DO NOT sell or rent your personal information.\n\nWe may share anonymous data with:\n• Agricultural research partners (anonymized data only)\n• Cloud service providers (secure storage)\n• Authorities upon valid legal request',
    cs_tieude_4: '4. Data security',
    cs_noidung_4: 'We apply industry-standard security measures:\n\n• HTTPS encryption for all connections\n• Password hashing via bcrypt\n• Analysis images deleted after 30 days\n• Short-lived authentication tokens',
    cs_tieude_5: '5. Your rights',
    cs_noidung_5: 'You have the right to:\n\n• View, edit, or delete your account at any time\n• Export all your data\n• Request full deletion from our system\n• Opt out of notifications\n• Submit complaints via support email',
    cs_tieude_6: '6. Contact',
    cs_noidung_6: 'If you have questions about our privacy policy, please contact:\n\n📧 privacy@plantcare.ai\n🌐 www.plantcare.ai/privacy\n\nWe will respond within 72 business hours.',

    // Tutorial Screen
    hdq_tieude_chinh: 'Scan Guide',
    hdq_boqua: 'Skip',
    hdq_buoc: 'Step',
    hdq_batdau: '🔍 Start Scanning',
    hdq_tieptheo: 'Next →',
    hdq_b1_t: 'Snap the Leaf',
    hdq_b1_m: 'Center the leaf in the frame. Ensure the leaf covers at least 70% of the area for better AI recognition.',
    hdq_b1_meo: '💡 Sharp & Close-up',
    hdq_b2_t: 'Good Lighting',
    hdq_b2_m: 'Shoot outdoors or near a window. Avoid dark shadows or direct flash that causes glare.',
    hdq_b2_meo: '💡 Natural light is best',
    hdq_b3_t: 'Focus on Affected Area',
    hdq_b3_m: 'Focus on spots, yellowing, or mold signs. AI will analyze the texture in seconds.',
    hdq_b3_meo: '💡 Multiple angles if needed',

    // Terms of Service Screen
    dk_tieude_chinh: 'Terms of Service',
    dk_hieuluc: 'Effective:',
    dk_tieude_1: '1. Acceptance of Terms',
    dk_noidung_1: 'By downloading, installing, or using PlantCare AI, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree, please do not use the app.',
    dk_tieude_2: '2. Intended Use',
    dk_noidung_2: 'PlantCare AI is developed for the purpose of:\n\n• Supporting preliminary identification of common plant diseases\n• Providing reference information on how to treat diseases\n• Storing plant health monitoring history\n\nThe app does NOT replace professional advice from agricultural engineers.',
    dk_tieude_3: '3. Limitation of Liability',
    dk_noidung_3: 'AI analysis results are for reference and may not be 100% accurate.\n\nWe are not responsible for:\n• Farming decisions based on analysis results\n• Crop damage due to misuse of information\n• Technical issues beyond our control',
    dk_tieude_4: '4. Intellectual Property Rights',
    dk_noidung_4: 'All content in PlantCare AI including interface, AI models, plant disease database, and documentation are owned by PlantCare AI.\n\nYou may NOT copy, distribute, or commercialize any part without written permission.',
    dk_tieude_5: '5. User Account',
    dk_noidung_5: 'You are responsible for:\n\n• Keeping your account password confidential\n• Notifying immediately if unusual activity is detected\n• Not sharing your account with others\n• Providing accurate information when registering',
    dk_tieude_6: '6. Changes to Service',
    dk_noidung_6: 'We reserve the right to change, suspend, or stop providing the service at any time, with or without prior notice.\n\nImportant changes will be notified via email or in-app notification.',

    // Feedback Screen
    ph_tieude_chinh: 'Feedback & Support',
    ph_hero_t: 'Help Us Improve',
    ph_hero_m: 'Every feedback is important to us',
    ph_loai_label: 'Feedback Type',
    ph_loai_bug: 'Report Bug',
    ph_loai_tinhnang: 'Feature Request',
    ph_loai_gopy: 'UX Feedback',
    ph_loai_khac: 'Other',
    ph_mota_label: 'Detailed Description',
    ph_mota_placeholder: 'Describe your issue or feedback...',
    ph_email_label: 'Contact Email',
    ph_email_hint: '(optional)',
    ph_email_placeholder: 'email@example.com',
    ph_nut_gui: 'Submit Feedback',
    ph_nut_danggui: 'Sending...',
    ph_toast_loi_mota: 'Please enter your feedback',
    ph_toast_tc_t: 'Thanks for your feedback! 🙏',
    ph_toast_tc_m: 'We will review it within 24-48 hours',

    // Auth Screens (Login/Register)
    dn_chaomung: 'Welcome Back!',
    dn_tieptheo: 'Sign in to continue',
    dn_email_label: 'Email',
    dn_email_placeholder: 'email@example.com',
    dn_matkhau_label: 'Password',
    dn_matkhau_placeholder: '••••••••',
    dn_quenmatkhau: 'Forgot Password?',
    dn_dang_dangnhap: 'Logging in...',
    dn_dangnhap: 'Login',
    dn_chuacotaikhoan: "Don't have an account? ",
    dn_dangkyngay: 'Register now',
    dn_boqua: 'Skip login →',

    dk_taotaikhoan: 'Create Account 🌱',
    dk_batdaubaove: 'Start protecting your plants',
    dk_hovaten_label: 'Full Name',
    dk_hovaten_placeholder: 'John Doe',
    dk_email_label: 'Email',
    dk_email_placeholder: 'email@example.com',
    dk_matkhau_label: 'Password',
    dk_matkhau_placeholder_min: 'Minimum 6 characters',
    dk_dang_tao: 'Creating...',
    dk_dangky: 'Register',
    dk_dacotaikhoan: 'Already have an account? ',
    dk_dangnhap: 'Login',

    // About App Screen
    vud_tieude_chinh: 'About App',
    vud_phienban: 'Version',
    vud_sumenh_t: 'Our Mission',
    vud_sumenh_m: 'PlantCare AI was developed with the goal of helping farmers and plant enthusiasts easily detect plant diseases using artificial intelligence, thereby providing the most timely and effective treatment measures.',
    vud_lienhe_t: 'Contact Us',
    vud_banquyen: '© 2026 PlantCare AI. All rights reserved.',
    vud_lamvoi: 'Made with ❤️ in Vietnam',

    // Onboarding Screen
    ob_boqua: 'Skip',
    ob_s1_t: 'Take Photo of Leaves',
    ob_s1_m: 'Take or upload photos of diseased leaves to the app to start analysis',
    ob_s2_t: 'AI Analysis',
    ob_s2_m: 'Artificial intelligence automatically identifies disease types with high accuracy',
    ob_s3_t: 'Get Treatment Plan',
    ob_s3_m: 'Detailed treatment instructions and effective preventive measures',
    ob_batdau: 'Get Started 🚀',
    ob_tieptheo: 'Next',

    // Splash Screen
    sp_tagline: 'Smart Plant Disease Detection 🌿',

    // Notification Screen
    tb_tieude_chinh: 'Notifications',
    tb_chuadoc: 'unread',
    tb_doctatca: 'Read all',
    tb_trong_t: 'No notifications',
    tb_trong_m: 'Disease alerts and reminders will appear here',

    // Camera Screen
    cm_quyen_t: 'Permission',
    cm_quyen_m: 'Need access to your photo library.',
    cm_huongdan: 'Place the leaf in the frame',
    cm_meo_anhsang: '💡 Ensure adequate lighting for better accuracy',

    // Preview Screen
    xta_tieude_chinh: 'Confirm Photo',
    xta_anhdachup: 'Captured Image',
    xta_cat: 'Crop ✂️',
    xta_xoay: 'Rotate 🔄',
    xta_sang: 'Bright ☀️',
    xta_meo_cat: 'Crop close to the affected area to improve AI accuracy',
    xta_nut_chulai: 'Retake',
    xta_nut_phantich: 'Analyze Now 🚀',

    // Account Screen
    tk_title: 'My Profile',
    tk_dangxuat: 'Sign Out',
    tk_xacnhan_dx: 'Are you sure you want to sign out?',
    tk_huy: 'Cancel',
    tk_danhgia_t: 'Rate App',
    tk_danhgia_m: 'How do you like PlantCare AI? Please share your feedback with us!',
    tk_danhgia_nut: 'Rate Now',
    tk_daluu: 'Saved Items',
    tk_thongbao: 'Notifications',
    tk_trogiup: 'Help Center',
    tk_phienban: 'Latest version',

    // Result Screen
    kq_dang_xuly: 'Processing image...',
    kq_trich_xuat: 'Extracting pathological features...',
    kq_doi_chieu: 'Matching database...',
    kq_hoan_thien: 'Finalizing results...',
    kq_tieude_chinh: 'Result Details',
    kq_do_chinh_xac: 'Accuracy',
    kq_muc_do: 'Severity',
    kq_tab_trieuchung: 'Symptoms',
    kq_tab_dieutri: 'Treatment',
    kq_tab_phongngua: 'Prevention',
    kq_trong: 'No abnormal symptoms detected ✅',
    kq_nut_luu: '💾 Save',
    kq_nut_chia_se: '📤 Share',
    kq_nut_quet_lai: '🔄 Retake',

    // Severity Levels
    muc_thap: 'Low',
    muc_trungbinh: 'Medium',
    muc_cao: 'High',
    muc_nghiemtrong: 'Critical',

    // Edit Profile Screen
    cshs_tieude_chinh: 'Edit Profile',
    cshs_label_hoten: 'Full Name',
    cshs_placeholder_hoten: 'Enter your full name',
    cshs_label_email: 'Email',
    cshs_placeholder_email: 'Enter your email',
    cshs_label_sdt: 'Phone Number',
    cshs_placeholder_sdt: 'Not updated',
    cshs_dang_luu: 'Saving...',
    cshs_luu_thay_doi: 'Save Changes',
    cshs_quyen_t: 'Permission',
    cshs_quyen_m: 'The app needs photo library access to change your avatar.',

    // Modal
    chon_ngon_ngu: 'Select Language',
    chon_co_chu: 'Select Font Size',
    btn_luu: 'Changes saved',
    tin_nhan_xoa_cache: 'Cache cleared successfully',
    xac_nhan_xoa: 'Clear all cached images and temporary data?',
    huy: 'Cancel',
    xoa: 'Clear',

    // Font Sizes
    cc_nho: 'Small',
    cc_binh_thuong: 'Normal',
    cc_lon: 'Large',

    // Toasts & Messages
    toast_bat_thong_bao: 'Push notifications enabled',
    toast_tat_thong_bao: 'Push notifications disabled',
    toast_dang_ky_email: 'Registered for Email alerts',
    toast_huy_email: 'Unsubscribed from Email alerts',
    toast_bat_sao_luu: 'Auto backup enabled',
    toast_tat_sao_luu: 'Auto backup disabled',
};

export const tuDien = {
    'Tiếng Việt': vi,
    'English': en,
};

export type TuKhoaNgonNgu = keyof typeof vi;

export function useNgonNgu() {
    const { ngon_ngu } = useCaiDatStore();
    const t = (key: TuKhoaNgonNgu) => {
        return tuDien[ngon_ngu]?.[key] || vi[key] || key;
    };
    return t;
}

export function useCoChu() {
    const { co_chu } = useCaiDatStore();

    // Trả về một hàm để scale font size
    const s = (size: number) => {
        if (co_chu === 'Nhỏ') return size * 0.85;
        if (co_chu === 'Lớn') return size * 1.25;
        return size; // Bình thường
    };

    return s;
}
