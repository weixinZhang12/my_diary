// use std::path::Path;


// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {

    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        // .setup(|app| {
        //     let handle = app.handle();

        //     // 启动 wrap 服务器
        //     tokio::spawn(async move {
        //         let folder_path=Path::new("/home/dreamya/桌面/test_theme");
        //         if folder_path.exists()&&folder_path.is_dir(){
        //             println!("文件夹存在");
        //             let static_dir = warp::fs::dir("/home/dreamya/桌面/test_theme"); // 你的静态资源目录

        //             warp::serve(static_dir)
        //                 .run(([127, 0, 0, 1], 65535)) // 服务器监听 127.0.0.1:3030
        //                 .await;
        //         }
        //         else {
        //             println!("路径不存在")
        //         }
   
        //     });

        //     Ok(())
        // })
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
