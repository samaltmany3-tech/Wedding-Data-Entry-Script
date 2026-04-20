#target photoshop

function weddingBatchScript_ESL_Final() {
    // ==========================================
    // === هندسة الواجهة الجديدة (نظام العمودين) ===
    // ==========================================
    var win = new Window("dialog", "معالج القوالب التلقائي | لوحة التحكم");
    win.orientation = "column";
    win.alignChildren = ["fill", "top"];
    win.spacing = 15;
    win.margins = 20;

    // حاوية أفقية رئيسية تقسم الواجهة إلى قسمين
    var mainRow = win.add("group");
    mainRow.orientation = "row";
    mainRow.alignChildren = ["fill", "top"];
    mainRow.spacing = 20;

    // ---------------------------------------------------
    // --- العمود الأيسر (للبيانات والإعدادات) ---
    // ---------------------------------------------------
    var leftCol = mainRow.add("group");
    leftCol.orientation = "column";
    leftCol.alignChildren = ["fill", "top"];
    leftCol.spacing = 15;
    leftCol.preferredSize.width = 320; 

    // صندوق البيانات الأساسية
    var basicDataPanel = leftCol.add("panel", undefined, "البيانات المستخرجة (للمراجعة والتعديل)");
    basicDataPanel.orientation = "column";
    basicDataPanel.alignChildren = ["right", "top"];
    basicDataPanel.margins = 15;
    basicDataPanel.spacing = 10;
    basicDataPanel.enabled = false; 

    var row1 = basicDataPanel.add("group");
    row1.add("statictext", undefined, "الاسم الأول (A1):");
    var txtFirstName = row1.add("edittext", undefined, "");
    txtFirstName.characters = 20;

    var row2 = basicDataPanel.add("group");
    row2.add("statictext", undefined, "بقية الاسم (A2):");
    var txtRestName = row2.add("edittext", undefined, "");
    txtRestName.characters = 20;

    var row3 = basicDataPanel.add("group");
    row3.add("statictext", undefined, "بالإنجليزي (X3):");
    var txtEngName = row3.add("edittext", undefined, "");
    txtEngName.characters = 20;

    // صندوق إعدادات التصدير
    var optionsPanel = leftCol.add("panel", undefined, "إعدادات التصدير والحفظ");
    optionsPanel.orientation = "column";
    optionsPanel.alignChildren = ["right", "top"]; 
    optionsPanel.margins = 15;
    optionsPanel.spacing = 10;

    var chkSave = optionsPanel.add("checkbox", undefined, "تفعيل الحفظ التلقائي");
    chkSave.value = false; 

    var saveDetailsGroup = optionsPanel.add("group");
    saveDetailsGroup.orientation = "column";
    saveDetailsGroup.alignChildren = ["right", "top"];
    saveDetailsGroup.enabled = false; 

    var folderRow = saveDetailsGroup.add("group");
    folderRow.add("statictext", undefined, "المجلد:");
    var txtFolderName = folderRow.add("edittext", undefined, "المخرجات النهائية");
    txtFolderName.characters = 15; 
    var btnSelectPath = folderRow.add("button", undefined, "تحديد مسار");
    var lblCurrentPath = folderRow.add("statictext", undefined, "(الافتراضي: بجانب ملفات PSD)");

    var fileRow = saveDetailsGroup.add("group");
    fileRow.add("statictext", undefined, "الاسم الأساسي:");
    var txtFileName = fileRow.add("edittext", undefined, "تصميم");
    txtFileName.characters = 20; 

    var chkSavePSD = saveDetailsGroup.add("checkbox", undefined, "حفظ كـ PSD (نسخة مفتوحة)");
    chkSavePSD.value = true; 
    var chkSaveJPG = saveDetailsGroup.add("checkbox", undefined, "حفظ كـ JPG (صورة نهائية)");
    chkSaveJPG.value = false; 

    var rdoClose = saveDetailsGroup.add("radiobutton", undefined, "إغلاق القوالب بعد التعديل (لتخفيف الضغط)");
    rdoClose.value = true; 
    var rdoKeepOpen = saveDetailsGroup.add("radiobutton", undefined, "إبقاء القوالب مفتوحة");

    // ---------------------------------------------------
    // --- العمود الأيمن (للملفات والملحقات) ---
    // ---------------------------------------------------
    var rightCol = mainRow.add("group");
    rightCol.orientation = "column";
    rightCol.alignChildren = ["fill", "top"];
    rightCol.spacing = 15;
    rightCol.preferredSize.width = 320; 

    // صندوق الملفات الأساسية (ضروري)
    var filesPanel = rightCol.add("panel", undefined, "1. الملفات الأساسية (مطلوب)");
    filesPanel.orientation = "column";
    filesPanel.alignChildren = ["fill", "top"];
    filesPanel.margins = 15;
    filesPanel.spacing = 10;

    var btnPsd = filesPanel.add("button", undefined, "تحديد ملفات القوالب (PSD)");
    var psdInfo = filesPanel.add("statictext", undefined, "الملفات المختارة: 0", {alignment: "center"});
    btnPsd.helpTip = "اختر قالب أو قوالب الفوتوشوب التي تريد تطبيق البيانات عليها (يمكنك اختيار أكثر من ملف معاً).";

    var btnTxt = filesPanel.add("button", undefined, "اختيار ملف البيانات (TXT)");
    var txtPath = filesPanel.add("statictext", undefined, "لم يتم اختيار ملف...", {alignment: "center"});
    btnTxt.helpTip = "اختر ملف النصوص الذي يحتوي على الأسماء والبيانات المراد دمجها داخل القوالب.";

    // صندوق الملحقات البصرية (اختياري)
    var assetsPanel = rightCol.add("panel", undefined, "2. الملحقات البصرية (اختياري)");
    assetsPanel.orientation = "column";
    assetsPanel.alignChildren = ["fill", "top"];
    assetsPanel.margins = 15;
    assetsPanel.spacing = 10;

    var btnCalligraphy = assetsPanel.add("button", undefined, "اختيار المخطوطة (M1)");
    var lblCalligraphy = assetsPanel.add("statictext", undefined, "لم يتم التحديد", {alignment: "center"});
    btnCalligraphy.helpTip = "إذا كان القالب يحتوي على مساحة مخطوطة (M1)، اختر الملف من هنا. سيتم تجاهله للقوالب النصية العادية.";

    var btnCharacter = assetsPanel.add("button", undefined, "اختيار صور الشخصيات (S1)");
    var lblCharacter = assetsPanel.add("statictext", undefined, "لم يتم التحديد", {alignment: "center"});
    btnCharacter.helpTip = "إذا كان القالب يحتوي على مساحة شخصية (S1)، اختر الصور من هنا. سيتم توزيعها بالتناوب.";

    var btnShapes = assetsPanel.add("button", undefined, "اختيار صور الأشكال (S2, S3)");
    var lblShapes = assetsPanel.add("statictext", undefined, "لم يتم التحديد", {alignment: "center"});
    btnShapes.helpTip = "اختر الصور التي سيتم إدخالها داخل الأشكال في طبقات S2 و S3.";

    var btnLogo = assetsPanel.add("button", undefined, "إضافة شعار العميل");
    var lblLogo = assetsPanel.add("statictext", undefined, "لم يتم التحديد", {alignment: "center"});

    // ---------------------------------------------------
    // --- الشريط السفلي (أزرار التنفيذ) ---
    // ---------------------------------------------------
    var divider = win.add("panel");
    divider.alignment = "fill";
    divider.minimumSize.height = 2;

    var btnGroup = win.add("group");
    btnGroup.alignment = "center";
    btnGroup.spacing = 20;

    var applyBtn = btnGroup.add("button", undefined, "بدء المعالجة الآلية");
    applyBtn.preferredSize = [200, 40];
    applyBtn.graphics.font = ScriptUI.newFont("dialog", "BOLD", 14);

    var closeBtn = btnGroup.add("button", undefined, "إلغاء وخروج");
    closeBtn.preferredSize = [120, 40];

    // ==========================================
    // === المتغيرات والأحداث الخاصة بالأزرار ===
    // ==========================================
    var selectedCalligraphyFile = null;
    var selectedCharacterFiles = [];
    var selectedShapeFiles = [];
    var selectedPsdFiles = [];
    var selectedTxt = null;
    var fileContentGlobal = ""; 
    var customSavePath = null; 
    var selectedLogoFile = null;
    var globalShapeImageIndex = 0;

    btnCalligraphy.onClick = function() {
        selectedCalligraphyFile = File.openDialog("اختر ملف المخطوطة", "*.png;*.jpg;*.jpeg");
        if (selectedCalligraphyFile) {
            lblCalligraphy.text = selectedCalligraphyFile.name;
        } else {
            lblCalligraphy.text = "لم يتم التحديد";
        }
    };

    btnCharacter.onClick = function() {
        selectedCharacterFiles = File.openDialog("اختر صور الشخصيات", "*.png", true); 
        if (selectedCharacterFiles && selectedCharacterFiles.length > 0) {
            lblCharacter.text = "تم اختيار " + selectedCharacterFiles.length + " صورة/صور.";
        } else {
            lblCharacter.text = "لم يتم التحديد";
            selectedCharacterFiles = [];
        }
    };

    btnShapes.onClick = function() {
        selectedShapeFiles = File.openDialog("اختر صور الأشكال", "*.jpg;*.jpeg;*.png", true); 
        if (selectedShapeFiles && selectedShapeFiles.length > 0) {
            lblShapes.text = "تم اختيار " + selectedShapeFiles.length + " صورة/صور.";
        } else {
            lblShapes.text = "لم يتم التحديد";
            selectedShapeFiles = [];
        }
    };

    btnLogo.onClick = function() {
        selectedLogoFile = File.openDialog("اختر ملف الشعار", "*.png;*.jpg;*.jpeg");
        if (selectedLogoFile) {
            var fName = decodeURI(selectedLogoFile.name);
            lblLogo.text = (fName.length > 15) ? fName.substring(0, 15) + "..." : fName;
        } else {
            lblLogo.text = "لم يتم التحديد";
            selectedLogoFile = null;
        }
    };

    btnPsd.onClick = function() {
        selectedPsdFiles = File.openDialog("اختر ملفات الفوتوشوب", "*.psd;*.psdt", true);
        if (selectedPsdFiles) psdInfo.text = "الملفات المختارة: " + selectedPsdFiles.length;
    };

    btnTxt.onClick = function() {
        selectedTxt = File.openDialog("اختر ملف النصوص", "*.txt");
        if (selectedTxt) {
            txtPath.text = selectedTxt.name;
            
            selectedTxt.encoding = "UTF-8"; 
            selectedTxt.open("r");
            var content = selectedTxt.read();
            selectedTxt.close();
            fileContentGlobal = content;

            // سحب البيانات الأساسية
            var matchFirst = content.match(/الاسم:\s*([^\r\n]*)/i);
            var matchRest = content.match(/بقية الاسم:\s*([^\r\n]*)/i);
            var matchEng = content.match(/انجليزي:\s*([^\r\n]*)/i);

            txtFirstName.text = matchFirst ? matchFirst[1].replace(/^\s+|\s+$/g, '') : "";
            txtRestName.text = matchRest ? matchRest[1].replace(/^\s+|\s+$/g, '') : "";
            txtEngName.text = matchEng ? matchEng[1].replace(/^\s+|\s+$/g, '') : "";

            // --- التسمية التلقائية للمجلد والملفات (العريس ...) ---
            var autoName = "العريس";
            if (txtFirstName.text !== "") {
                autoName += " " + txtFirstName.text;
            }
            if (txtRestName.text !== "") {
                var nameParts = txtRestName.text.replace(/^\s+|\s+$/g, '').split(" ");
                if (nameParts.length > 0) {
                    var lastWord = nameParts[nameParts.length - 1];
                    autoName += " " + lastWord;
                }
            }
            
            // تطبيق الاسم الآلي على مربعات الحفظ
            if (autoName !== "العريس") {
                txtFolderName.text = autoName;
                txtFileName.text = autoName;
            }

            basicDataPanel.enabled = true;

            var blocks = content.match(/\[تصميم 0?\d+\]/gi);
            var count = blocks ? blocks.length : 0;

            if (txtFirstName.text === "" || txtRestName.text === "" || txtEngName.text === "") {
                alert("⚠️ تنبيه: بعض البيانات الأساسية ناقصة في المستند. تم تفعيل المربعات لتتمكن من إضافتها يدوياً.\n\nعدد التصاميم (المهنئون) المكتشفة: " + count);
            } else {
                alert("✅ تم سحب بيانات العريس بنجاح، وتوليد اسم المجلد تلقائياً!\nعدد التصاميم (المهنئون) المكتشفة: " + count);
            }
        }
    };

    btnSelectPath.onClick = function() {
        var selectedFolder = Folder.selectDialog("اختر مكان حفظ المجلد الجديد");
        if (selectedFolder) {
            customSavePath = selectedFolder; 
            lblCurrentPath.text = "(المسار: " + decodeURI(selectedFolder.name) + ")"; 
        } else {
            customSavePath = null;
            lblCurrentPath.text = "(الافتراضي: بجانب ملفات PSD)";
        }
    };

    chkSave.onClick = function() {
        saveDetailsGroup.enabled = chkSave.value;
    };

    function findLayerByName(parent, layerName) {
        for (var i = 0; i < parent.artLayers.length; i++) {
            if (parent.artLayers[i].name === layerName) return parent.artLayers[i];
        }
        for (var j = 0; j < parent.layerSets.length; j++) {
            var foundLayer = findLayerByName(parent.layerSets[j], layerName);
            if (foundLayer !== null) return foundLayer;
        }
        return null;
    }

    // ==========================================
    // === الدوال الذكية للنصوص ===
    // ==========================================

    function formatCongratulatorsText(text) {
        if (!text || text === "") return text;
        var parts = text.split(/\s*[-–—_]+\s*/);
        for (var i = 0; i < parts.length; i++) {
            parts[i] = parts[i].replace(/\s+/g, "\u00A0");
        }
        return parts.join("\u00A0- ");
    }

    function getSmartEnglishText(originalText, newText) {
        var newWords = newText.replace(/^\s+|\s+$/g, '').split(/\s+/);
        if (newWords.length === 0 || (newWords.length === 1 && newWords[0] === "")) return newText;
        
        var originalWords = originalText.replace(/^\s+|\s+$/g, '').split(/\s+/);
        var templateCount = originalWords.length; 
        var inputCount = newWords.length;         
        var resultWords = [];

        if (templateCount === 1) {
            resultWords.push(newWords[0]);
        } 
        else if (templateCount === 2) {
            if (inputCount === 2) {
                resultWords = newWords;
            } else if (inputCount >= 3) {
                resultWords.push(newWords[0]);
                resultWords.push(newWords[newWords.length - 1]);
            } else {
                resultWords = newWords;
            }
        } 
        else if (templateCount === 3) {
            for (var i = 0; i < Math.min(inputCount, 3); i++) {
                resultWords.push(newWords[i]);
            }
        } 
        else if (templateCount >= 4) {
            resultWords = newWords;
        }

        return resultWords.join(" ");
    }

    function getSmartDistributedText(originalText, newText) {
        var newWords = newText.replace(/^\s+|\s+$/g, '').split(/\s+/);
        if (newWords.length === 0 || newWords[0] === "") return newText;

        var originalLines = originalText.split(/\r|\n|\u0003/); 
        var originalStructure = [];
        var totalOriginalSlots = 0;

        for (var i = 0; i < originalLines.length; i++) {
            var cleanLine = originalLines[i].replace(/^\s+|\s+$/g, '');
            if (cleanLine === "") {
                originalStructure.push(0);
            } else {
                var wordsInLine = cleanLine.split(/\s+/);
                originalStructure.push(wordsInLine.length);
                totalOriginalSlots += wordsInLine.length;
            }
        }

        var selectedWords = [];
        var inputCount = newWords.length;

        if (totalOriginalSlots === 2 && inputCount >= 3) {
            selectedWords.push(newWords[0]);
            selectedWords.push(newWords[inputCount - 1]);
        } 
        else if (inputCount > totalOriginalSlots && totalOriginalSlots > 0) {
            for (var j = 0; j < totalOriginalSlots - 1; j++) selectedWords.push(newWords[j]);
            selectedWords.push(newWords[inputCount - 1]);
        } else {
            selectedWords = newWords;
        }

        var finalResult = [];
        var wordIdx = 0;
        for (var k = 0; k < originalStructure.length; k++) {
            var currentLine = [];
            if (originalStructure[k] === 0) {
                finalResult.push("");
                continue;
            }
            for (var l = 0; l < originalStructure[k]; l++) {
                if (wordIdx < selectedWords.length) {
                    currentLine.push(selectedWords[wordIdx]);
                    wordIdx++;
                }
            }
            if (k === originalStructure.length - 1 && wordIdx < selectedWords.length) {
                while(wordIdx < selectedWords.length) {
                    currentLine.push(selectedWords[wordIdx]);
                    wordIdx++;
                }
            }
            finalResult.push(currentLine.join(" "));
        }
        return finalResult.join("\r");
    }

    function getSmartX1Text(originalText, firstName, restName) {
        var originalWords = originalText.replace(/^\s+|\s+$/g, '').split(/\s+/);
        var originalCount = originalWords.length;
        if (originalCount === 0 || originalWords[0] === "") originalCount = 0;

        var fName = firstName.replace(/^\s+|\s+$/g, '');
        var restWords = restName.replace(/^\s+|\s+$/g, '').split(/\s+/);
        if (restWords.length === 1 && restWords[0] === "") restWords = [];

        var resultWords = [];

        if (fName !== "") {
            resultWords.push(fName);
        }

        var restCount = restWords.length;

        if (originalCount === 2) {
            if (restCount > 0) resultWords.push(restWords[restCount - 1]);
        } 
        else if (originalCount === 3) {
            if (restCount === 1) {
                resultWords.push(restWords[0]);
            } else if (restCount >= 2) {
                resultWords.push(restWords[0]);
                resultWords.push(restWords[restCount - 1]);
            }
        }
        else if (originalCount === 4) {
            if (restCount === 1) {
                resultWords.push(restWords[0]);
            } else if (restCount === 2) {
                resultWords.push(restWords[0]);
                resultWords.push(restWords[1]); 
            } else if (restCount >= 3) {
                resultWords.push(restWords[0]);
                resultWords.push(restWords[1]);
                resultWords.push(restWords[restCount - 1]);
            }
        }
        else {
            for (var i = 0; i < restCount; i++) {
                resultWords.push(restWords[i]);
            }
        }

        return resultWords.join(" ");
    }

    // ==========================================
    // === بدء المعالجة ===
    // ==========================================
    applyBtn.onClick = function() {
        if (selectedPsdFiles.length === 0 || !selectedTxt) {
            alert("خطأ: يرجى اختيار ملفات الفوتوشوب والمستند النصي أولاً!");
            return;
        }

        win.close();

        var progressWin = new Window("palette", "جاري المعالجة الآلية..."); 
        progressWin.orientation = "column";
        progressWin.alignChildren = ["center", "center"];
        progressWin.spacing = 15;
        progressWin.margins = 25;

        var lblStatus = progressWin.add("statictext", undefined, "جاري تحضير الملفات...");
        lblStatus.preferredSize.width = 350;
        lblStatus.justify = "center";

        var pBar = progressWin.add("progressbar", undefined, 0, selectedPsdFiles.length);
        pBar.preferredSize.width = 350;
        pBar.preferredSize.height = 20;

        var lblCounter = progressWin.add("statictext", undefined, "تم إنجاز 0 من أصل " + selectedPsdFiles.length);
        lblCounter.justify = "center";
        lblCounter.graphics.font = ScriptUI.newFont("dialog", "BOLD", 14);

        var btnCancelProgress = progressWin.add("button", undefined, "إلغاء العمل");
        
        var isCancelled = false; 
        btnCancelProgress.onClick = function() {
            isCancelled = true;
            lblStatus.text = "⚠️ جاري الإلغاء بأمان... يرجى الانتظار لحين إغلاق الملف الحالي.";
            progressWin.update();
        };

        progressWin.center();
        progressWin.show();

        var successCount = 0;
        var failCount = 0;
        var batchOutFolder = null; 
        var warningMessages = []; 

        var firstName = txtFirstName.text;
        var restName = txtRestName.text;
        var engName = txtEngName.text;

        var afrahText = "";
        if (restName !== "") {
            var nameParts = restName.replace(/^\s+|\s+$/g, '').split(" ");
            if (nameParts.length > 0) {
                var lastWord = nameParts[nameParts.length - 1];
                afrahText = "أفراح آل " + lastWord;
            }
        }

        for (var i = 0; i < selectedPsdFiles.length; i++) {
            if (isCancelled) break; 

            lblStatus.text = "جاري معالجة القالب: " + decodeURI(selectedPsdFiles[i].name);
            progressWin.update(); 

            var num = i + 1;
            var blockRegex = new RegExp("\\[تصميم\\s*0?" + num + "\\][\\s\\S]*?المهنئون:\\s*([\\s\\S]*?)(?=\\r?\\n\\s*\\[|$)", "i");
            var blockMatch = fileContentGlobal.match(blockRegex);
            
            var currentCongratulators = "";
            if (blockMatch && blockMatch[1]) {
                currentCongratulators = blockMatch[1].replace(/^\s+|\s+$/g, '');
            }

            try {
                var doc = app.open(selectedPsdFiles[i]);
                
                // ==========================================
                // === معالجة المخطوطات والمنطق الذكي (M1) ===
                // ==========================================
                var oldCalligraphyLayer = findLayerByName(doc, "M1");
                
                if (oldCalligraphyLayer !== null) {
                    if (selectedCalligraphyFile !== null) {
                        var oldBounds = oldCalligraphyLayer.bounds; 
                        var oldX = oldBounds[0].value;
                        var oldY = oldBounds[1].value;
                        var oldWidth = oldBounds[2].value - oldX;
                        var oldHeight = oldBounds[3].value - oldY;

                        var calDoc = app.open(selectedCalligraphyFile);
                        var isJpg = selectedCalligraphyFile.name.toLowerCase().match(/\.(jpg|jpeg)$/i);

                        if (isJpg) {
                            var desc = new ActionDescriptor();
                            var ref = new ActionReference();
                            ref.putProperty(charIDToTypeID("Chnl"), charIDToTypeID("fsel"));
                            desc.putReference(charIDToTypeID("null"), ref);
                            var ref2 = new ActionReference();
                            ref2.putEnumerated(charIDToTypeID("Chnl"), charIDToTypeID("Chnl"), charIDToTypeID("RGB "));
                            desc.putReference(charIDToTypeID("T   "), ref2);
                            executeAction(charIDToTypeID("setd"), desc, DialogModes.NO); 
                            
                            calDoc.selection.invert(); 
                            calDoc.selection.copy();
                        } else {
                            calDoc.selection.selectAll();
                            calDoc.selection.copy();
                        }

                        calDoc.close(SaveOptions.DONOTSAVECHANGES);

                        app.activeDocument = doc;

                        doc.activeLayer = oldCalligraphyLayer;
                        var newLayer = doc.paste();

                        var newBounds = newLayer.bounds;
                        var newWidth = newBounds[2].value - newBounds[0].value;
                        var newHeight = newBounds[3].value - newBounds[1].value;

                        var scaleRatio = (oldWidth / newWidth) * 100;
                        var projectedHeight = newHeight * (scaleRatio / 100);
                        if (projectedHeight > oldHeight) {
                            scaleRatio = (oldHeight / newHeight) * 100;
                        }

                        newLayer.resize(scaleRatio, scaleRatio, AnchorPosition.TOPLEFT);

                        var resizedBounds = newLayer.bounds;
                        var deltaX_M1 = oldX - resizedBounds[0].value;
                        var deltaY_M1 = oldY - resizedBounds[1].value;
                        newLayer.translate(deltaX_M1, deltaY_M1);

                        doc.activeLayer = oldCalligraphyLayer;
                        var hasStyle = false;
                        try {
                            executeAction(charIDToTypeID("CpFX"), undefined, DialogModes.NO);
                            hasStyle = true;
                        } catch(e) {
                        }

                        if (hasStyle) {
                            doc.activeLayer = newLayer;
                            try {
                                executeAction(charIDToTypeID("PaFX"), undefined, DialogModes.NO);
                            } catch(e) {
                            }
                        }

                        oldCalligraphyLayer.remove();
                        newLayer.name = "M1";

                        var afrahLayer = findLayerByName(doc, "X2");
                        if (afrahLayer !== null) afrahLayer.remove();
                        
                        var nameLayerX1 = findLayerByName(doc, "X1");
                        if (nameLayerX1 !== null) nameLayerX1.remove();

                    } else {
                        warningMessages.push("القالب [" + decodeURI(doc.name) + "] يحتاج مخطوطة ولم تقم برفعها.");
                        throw new Error("Missing Calligraphy File");
                    }
                }

                // ==========================================
                // === معالجة صور الشخصيات والمنطق الذكي (S1) ===
                // ==========================================
                var oldS1Layer = findLayerByName(doc, "S1");
                
                if (oldS1Layer !== null) {
                    if (selectedCharacterFiles.length > 0) {
                        var charIndex = i % selectedCharacterFiles.length; 
                        var charFile = selectedCharacterFiles[charIndex];

                        var oldS1Bounds = oldS1Layer.bounds; 
                        var oldS1X = oldS1Bounds[0].value;
                        var oldS1Y = oldS1Bounds[1].value;
                        var oldS1Width = oldS1Bounds[2].value - oldS1X;
                        var oldS1Height = oldS1Bounds[3].value - oldS1Y;

                        var charDoc = app.open(charFile);
                        charDoc.selection.selectAll();
                        charDoc.selection.copy();
                        charDoc.close(SaveOptions.DONOTSAVECHANGES);

                        app.activeDocument = doc;

                        doc.activeLayer = oldS1Layer;
                        var newCharLayer = doc.paste();

                        var newCharBounds = newCharLayer.bounds;
                        var newCharX = newCharBounds[0].value;
                        var newCharY = newCharBounds[1].value;
                        var newCharWidth = newCharBounds[2].value - newCharX;
                        var newCharHeight = newCharBounds[3].value - newCharY;

                        var scaleRatio_S1 = (oldS1Height / newCharHeight) * 100;
                        newCharLayer.resize(scaleRatio_S1, scaleRatio_S1, AnchorPosition.TOPLEFT);

                        var resizedCharBounds = newCharLayer.bounds;
                        var rX_S1 = resizedCharBounds[0].value;
                        var rY_S1 = resizedCharBounds[1].value;
                        var rWidth_S1 = resizedCharBounds[2].value - rX_S1;

                        var deltaY_S1 = oldS1Y - rY_S1; 
                        
                        var oldCenterX = oldS1X + (oldS1Width / 2);
                        var newCenterX = rX_S1 + (rWidth_S1 / 2);
                        var deltaX_S1 = oldCenterX - newCenterX;

                        newCharLayer.translate(deltaX_S1, deltaY_S1);

                        oldS1Layer.remove();
                        newCharLayer.name = "S1";
                    }
                }

                // ==========================================
                // === معالجة صور الأشكال (S2 و S3) ===
                // ==========================================
                var shapeLayers = ["S2", "S3"];
                
                for (var s = 0; s < shapeLayers.length; s++) {
                    var shapeLayer = findLayerByName(doc, shapeLayers[s]);
                    
                    if (shapeLayer !== null && selectedShapeFiles.length > 0) {
                        var parent = shapeLayer.parent;
                        var keepChecking = true;

                        while (keepChecking) {
                            keepChecking = false;
                            var layerIndex = -1;
                            
                            for (var idx = 0; idx < parent.layers.length; idx++) {
                                if (parent.layers[idx] === shapeLayer) {
                                    layerIndex = idx;
                                    break;
                                }
                            }
                            
                            if (layerIndex > 0) {
                                var layerAbove = parent.layers[layerIndex - 1];
                                if (layerAbove.grouped === true) {
                                    layerAbove.remove(); 
                                    keepChecking = true; 
                                }
                            }
                        }

                        var shapeImgFile = selectedShapeFiles[globalShapeImageIndex % selectedShapeFiles.length];
                        globalShapeImageIndex++; 

                        var shapeBounds = shapeLayer.bounds; 
                        var sX = shapeBounds[0].value;
                        var sY = shapeBounds[1].value;
                        var sWidth = shapeBounds[2].value - sX;
                        var sHeight = shapeBounds[3].value - sY;

                        var imgDoc = app.open(shapeImgFile);
                        imgDoc.selection.selectAll();
                        imgDoc.selection.copy();
                        imgDoc.close(SaveOptions.DONOTSAVECHANGES);

                        app.activeDocument = doc;

                        doc.activeLayer = shapeLayer;
                        var newImgLayer = doc.paste();

                        newImgLayer.grouped = true;

                        var imgBounds = newImgLayer.bounds;
                        var iX = imgBounds[0].value;
                        var iY = imgBounds[1].value;
                        var iWidth = imgBounds[2].value - iX;
                        var iHeight = imgBounds[3].value - iY;

                        var ratioW = sWidth / iWidth;
                        var ratioH = sHeight / iHeight;
                        var scaleRatio_Shape = Math.max(ratioW, ratioH) * 100;

                        newImgLayer.resize(scaleRatio_Shape, scaleRatio_Shape, AnchorPosition.TOPLEFT);

                        var resizedImgBounds = newImgLayer.bounds;
                        var rX_Shape = resizedImgBounds[0].value;
                        var rY_Shape = resizedImgBounds[1].value;
                        var rWidth_Shape = resizedImgBounds[2].value - rX_Shape;
                        var rHeight_Shape = resizedImgBounds[3].value - rY_Shape;

                        var shapeCenterX = sX + (sWidth / 2);
                        var shapeCenterY = sY + (sHeight / 2);
                        
                        var imgCenterX = rX_Shape + (rWidth_Shape / 2);
                        var imgCenterY = rY_Shape + (rHeight_Shape / 2);

                        var deltaX_Shape = shapeCenterX - imgCenterX;
                        var deltaY_Shape = shapeCenterY - imgCenterY;

                        newImgLayer.translate(deltaX_Shape, deltaY_Shape);
                    }
                }

                var targetLayers = ["A1", "A2", "X1", "X2", "X3", "X4"];
                
                for (var j = 0; j < targetLayers.length; j++) {
                    var lyrName = targetLayers[j];
                    var lyr = findLayerByName(doc, lyrName);
                    
                    if (lyr !== null && lyr.kind === LayerKind.TEXT) {
                        if (lyrName === "A1" && firstName !== "") {
                            lyr.textItem.contents = firstName;
                        }
                        else if (lyrName === "A2" && restName !== "") {
                            lyr.textItem.contents = getSmartDistributedText(lyr.textItem.contents, restName);
                        }
                        else if (lyrName === "X1" && firstName !== "" && restName !== "") {
                            lyr.textItem.contents = getSmartX1Text(lyr.textItem.contents, firstName, restName);
                        }
                        else if (lyrName === "X2" && afrahText !== "") {
                            lyr.textItem.contents = afrahText;
                        }
                        else if (lyrName === "X3" && engName !== "") {
                            lyr.textItem.contents = getSmartEnglishText(lyr.textItem.contents, engName);
                        }
                        // ==========================================
                        // === معالجة المهنئون (X4) - النسخة المطورة ===
                        // ==========================================
                        else if (lyrName === "X4" && currentCongratulators !== "") {
                            try {

                                var textItem = lyr.textItem;

                                // ========= إعدادات القالب (قبل تغيير النص) =========
                                var originalSize    = parseFloat(textItem.size);
                                var originalLeading = parseFloat(textItem.leading);
                                var leadingRatio    = originalLeading / originalSize;

                                var boxWidth  = textItem.width.as("px");
                                var boxHeight = textItem.height.as("px");

                                // ========= تطبيق \u00A0 على النص =========
                                var protectedText = formatCongratulatorsText(currentCongratulators);
                                var names = protectedText.split(/\s*[-–—,;]\s*/);
                                for (var n = 0; n < names.length; n++) {
                                    names[n] = names[n].replace(/ /g, "\u00A0");
                                }
                                var finalText = names.join(" - ");

                                // ========= إدخال النص =========
                                textItem.contents      = finalText;
                                textItem.useAutoLeading = false;

                                // ========= دالة الفحص =========
                                function fits() {
                                    var b = lyr.bounds;
                                    var w = b[2].as("px") - b[0].as("px");
                                    var h = b[3].as("px") - b[1].as("px");
                                    return (w <= boxWidth && h <= boxHeight);
                                }

                                // ========= Fast Shrink =========
                                var currentSize = originalSize;

                                while (!fits() && currentSize > 5) {
                                    currentSize -= 4;
                                    textItem.size    = new UnitValue(currentSize, "pt");
                                    textItem.leading = new UnitValue(currentSize * leadingRatio, "pt");
                                }

                                // ========= Binary Search =========
                                var low  = 5;
                                var high = currentSize + 4;
                                var best = low;

                                while (high - low > 0.5) {
                                    var mid = (low + high) / 2;
                                    textItem.size    = new UnitValue(mid, "pt");
                                    textItem.leading = new UnitValue(mid * leadingRatio, "pt");

                                    if (fits()) {
                                        best = mid;
                                        low  = mid;
                                    } else {
                                        high = mid;
                                    }
                                }

                                // ========= تطبيق النتيجة =========
                                textItem.size    = new UnitValue(best, "pt");
                                textItem.leading = new UnitValue(best * leadingRatio, "pt");

                                // ========= استبدال الشرطات الزائدة بفراغ =========
                                var currentText = textItem.contents;
                                var lines = currentText.split(/\r/);

                                for (var l = 0; l < lines.length; l++) {
                                    lines[l] = lines[l].replace(/^\s*[-–—,;]\s*/, "\u00A0");
                                    lines[l] = lines[l].replace(/\s*[-–—,;]\s*$/, "\u00A0");
                                }

                                textItem.contents = lines.join("\r");

                            } catch (e) {
                                $.writeln("❌ خطأ في معالجة X4: " + e.message);
                            }
                        }
                    }
                }

                // ==========================================
                // === معالجة الشعار ===
                // ==========================================
                if (selectedLogoFile !== null) {
                    var logoPosition = "right"; 

                    var originalRulerUnits = app.preferences.rulerUnits;
                    app.preferences.rulerUnits = Units.PIXELS;

                    var docW = doc.width.value;
                    var docH = doc.height.value;

                    var maxPx = docW * (15 / 300);
                    var marginPx = docW * (5 / 300); 

                    var logoDoc = app.open(selectedLogoFile);
                    logoDoc.selection.selectAll();
                    logoDoc.selection.copy();
                    logoDoc.close(SaveOptions.DONOTSAVECHANGES);

                    app.activeDocument = doc;
                    
                    var logoLayer = doc.paste();
                    logoLayer.name = "شعار العميل";

                    var lb = logoLayer.bounds;
                    var lX = lb[0].value;
                    var lY = lb[1].value;
                    var lW = lb[2].value - lX;
                    var lH = lb[3].value - lY;

                    var scaleRatio = 100;
                    if (lW > lH) {
                        scaleRatio = (maxPx / lW) * 100; 
                    } else {
                        scaleRatio = (maxPx / lH) * 100; 
                    }
                    
                    logoLayer.resize(scaleRatio, scaleRatio, AnchorPosition.TOPLEFT);

                    var nLb = logoLayer.bounds;
                    var nlX = nLb[0].value;
                    var nlY = nLb[1].value;
                    var nlW = nLb[2].value - nlX;
                    var nlH = nLb[3].value - nlY;

                    var targetY = docH - nlH - marginPx; 
                    var targetX = 0;

                    if (logoPosition === "right") {
                        targetX = docW - nlW - marginPx; 
                    } else {
                        targetX = marginPx; 
                    }

                    var deltaX = targetX - nlX;
                    var deltaY = targetY - nlY;
                    logoLayer.translate(deltaX, deltaY);

                    app.preferences.rulerUnits = originalRulerUnits;
                }

                if (chkSave.value === true) {
                    if (batchOutFolder === null) {
                        var baseFolder = customSavePath ? customSavePath : selectedPsdFiles[0].parent;
                        var folderNameText = txtFolderName.text;
                        if (folderNameText === "") folderNameText = "المخرجات النهائية";
                        
                        batchOutFolder = new Folder(baseFolder + "/" + folderNameText);
                        var folderCounter = 1;
                        
                        while (batchOutFolder.exists) {
                            batchOutFolder = new Folder(baseFolder + "/" + folderNameText + " " + folderCounter);
                            folderCounter++;
                        }
                        batchOutFolder.create();
                    }
                    
                    var outFolder = batchOutFolder;
                    var fileNameText = txtFileName.text;
                    if (fileNameText === "") fileNameText = "تصميم";

                    var suffix = (i === 0) ? "" : " " + (i + 1);
                    var finalFileName = fileNameText + suffix;
                    
                    if (chkSavePSD.value === true) {
                        var psdFile = new File(outFolder + "/" + finalFileName + ".psd");
                        var psdSaveOptions = new PhotoshopSaveOptions();
                        psdSaveOptions.alphaChannels = true;
                        psdSaveOptions.layers = true;
                        doc.saveAs(psdFile, psdSaveOptions, false, Extension.LOWERCASE); 
                    }
                    
                    if (chkSaveJPG.value === true) {
                        var jpgFile = new File(outFolder + "/" + finalFileName + ".jpg");
                        var jpgSaveOptions = new JPEGSaveOptions();
                        jpgSaveOptions.quality = 10; 
                        doc.saveAs(jpgFile, jpgSaveOptions, true, Extension.LOWERCASE);
                    }
                    
                    if (rdoClose.value === true) {
                        doc.close(SaveOptions.DONOTSAVECHANGES); 
                    }
                }

                successCount++;
                pBar.value = i + 1;
                lblCounter.text = "تم إنجاز " + (i + 1) + " من أصل " + selectedPsdFiles.length;
                progressWin.update();

            } catch (e) {
                failCount++;
                try { doc.close(SaveOptions.DONOTSAVECHANGES); } catch(closeErr) {}
            }
        }

        progressWin.close();

        var endWin = new Window("dialog", "ملخص العملية");
        endWin.orientation = "column";
        endWin.alignChildren = ["center", "top"];
        endWin.spacing = 15;
        endWin.margins = 25;

        var finalTitleText = isCancelled ? "⚠️ تم إيقاف العملية يدوياً!" : "✅ اكتملت المعالجة بنجاح!";
        var lblTitle = endWin.add("statictext", undefined, finalTitleText);
        lblTitle.graphics.font = ScriptUI.newFont("dialog", "BOLD", 18);

        var summaryPanel = endWin.add("panel", undefined, "ملخص النتائج");
        summaryPanel.orientation = "column";
        summaryPanel.alignChildren = ["center", "top"];
        summaryPanel.margins = 15;
        summaryPanel.spacing = 5;
        
        summaryPanel.add("statictext", undefined, "تمت معالجة القوالب بنجاح: " + successCount);
        if (failCount > 0) {
            var failText = summaryPanel.add("statictext", undefined, "قوالب فشل معالجتها: " + failCount);
        }

        if (warningMessages.length > 0) {
            var warningGroup = summaryPanel.add("group");
            warningGroup.orientation = "column";
            warningGroup.alignChildren = ["right", "top"];
            warningGroup.margins = [0, 10, 0, 0];
            
            var lblWarnTitle = warningGroup.add("statictext", undefined, "⚠️ ملاحظات هامة:");
            lblWarnTitle.graphics.font = ScriptUI.newFont("dialog", "BOLD", 13);
            
            for (var w = 0; w < warningMessages.length; w++) {
                var warnText = warningGroup.add("statictext", undefined, "- " + warningMessages[w]);
                try { warnText.graphics.foregroundColor = warnText.graphics.newPen(warnText.graphics.PenType.SOLID_COLOR, [0.8, 0, 0, 1], 1); } catch(err) {}
            }
        }

        var endBtnGroup = endWin.add("group");
        endBtnGroup.orientation = "row";
        endBtnGroup.alignment = "center";
        endBtnGroup.spacing = 15;

        if (chkSave.value === true && batchOutFolder !== null && batchOutFolder.exists) {
            var btnOpenFolder = endBtnGroup.add("button", undefined, "📂 افتح مجلد المخرجات الآن");
            btnOpenFolder.onClick = function() {
                batchOutFolder.execute(); 
                endWin.close();
            };
        }

        var btnCloseEnd = endBtnGroup.add("button", undefined, "إغلاق");
        btnCloseEnd.onClick = function() {
            endWin.close();
        };

        endWin.show();
    };

    closeBtn.onClick = function() {
        win.close();
    };

    win.show();
}

weddingBatchScript_ESL_Final();
