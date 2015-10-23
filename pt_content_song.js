(function() {
    var be = NEJ.P,
        co = NEJ.F,
        bK = be("nej.ut"),
        bm = be("nej.u"),
        bj = be("nej.v"),
        bH = be("nej.j"),
        bo = be("nm.l"),
        bp = be("nm.d"),
        bb;
    bp.gN({
        "artist_sub-list": {
            url: "/api/artist/sublist",
            type: "GET",
            format: function(bHN, bf) {
                var bk = bHN.data || [];
                bk.length = bf.data.limit;
                return {
                    total: bHN.count || 0,
                    list: bk
                }
            }
        },
        "artist_sub-add": {
            url: "/api/artist/sub",
            type: "GET",
            format: function(bHN, bf) {
                bo.cq.bO({
                    tip: "收藏成功",
                    type: 1
                });
                bj.bG(bp.ue, "itemchange", {
                    id: bf.data.artistId,
                    subscribed: true
                })
            },
            onmessage: function(dU) {
                var je = {
                    405: "你操作太快了，请休息一会再试！",
                    406: "你操作太快了，请休息一会再试！"
                };
                bo.cq.bO({
                    tip: je[dU] || "收藏失败",
                    type: 2
                })
            }
        },
        "artist_sub-del": {
            url: "/api/artist/unsub",
            type: "GET",
            filter: function(bf) {
                bf.data.artistIds = "[" + bf.data.artistId + "]"
            },
            format: function(bHN, bf) {
                bo.cq.bO({
                    tip: "取消收藏成功",
                    type: 1
                });
                bj.bG(bp.ue, "itemchange", {
                    id: bf.data.artistId,
                    subscribed: false
                })
            },
            onmessage: function(dU) {
                var je = {
                    405: "你操作太快了，请休息一会再试！",
                    406: "你操作太快了，请休息一会再试！"
                };
                bo.cq.bO({
                    tip: je[dU] || "收藏失败",
                    type: 2
                })
            }
        }
    });
    bp.ue = NEJ.C();
    bb = bp.ue.bN(bp.gY);
    bb.dv = function() {
        this.dF()
    };
    bK.hh.bL({
        element: bp.ue,
        event: ["listchange", "itemchange"]
    })
})();
(function() {
    var be = NEJ.P,
        bZ = NEJ.O,
        co = NEJ.F,
        Fp = be("nej.e"),
        bj = be("nej.v"),
        bK = be("nej.ut"),
        bm = be("nej.u"),
        cQ = be("nej.ui"),
        bq = be("nm.x"),
        bp = be("nm.d"),
        bEZ = be("nm.w"),
        dX = be("nm.i"),
        bb;
    bEZ.bHI = NEJ.C();
    bb = bEZ.bHI.bN(cQ.ic);
    bb.bLv = function() {
        this.dn = "m-wgt-song-box"
    };
    bb.bFa = function() {
        this.bLu();
        var bk = Fp.bP(this.bB, "j-flag");
        this.cO = {
            limit: 1e3,
            parent: bk[0],
            onbeforelistload: this.bGU.bh(this),
            onemptylist: this.baa.bh(this),
            onafterlistrender: this.OV.bh(this)
        }
    };
    bb.cw = function(bf) {
        this.cA(bf);
        this.dA([
            [this.bB, "click", this.gI.bh(this)],
            [window, "playchange", this.bJI.bh(this)]
        ]);
        this.cO.item = {
            klass: bf.tpl || "m-wgt-song-list",
            canDel: bf.canDel,
            type: bf.type,
            disable: this.bIf,
            songAlia: bq.bdM,
            dur2time: bq.lx,
            getArtistName: bq.ls,
            isPlaying: this.bIe,
            extData: bf.extData
        };
        this.cO.cache = {
            klass: bp.uQ,
            lkey: bf.key,
            data: bf.data
        };
        if (this.fK) {
            this.fK.ch()
        }
        this.fK = bK.hr.bL(this.cO)
    };
    bb.cX = function() {
        this.dc();
        if (this.fK) {
            this.fK.ch();
            delete this.fK
        }
    };
    bb.gI = function(bc) {
        var bid = bj.cf(bc, "d:resAction"),
            cv = Fp.bI(bid, "resAction"),
            bC = Fp.bI(bid, "resId");
        var eD = this.fK.AX().fh(bC);
        switch (cv) {
            case "share":
            case "fav":
            case "subscribe":
            case "addto":
            case "play":
            case "download":
            case "mv":
                if (bq.jC(eD)) {
                    if (eD.fee > 0) {
                        if (cv == "mv") location.dispatch2("/mv?id=" + eD.mvid);
                        else bq.bHG(eD.fee, eD.id, "song")
                    } else {
                        bq.bHH()
                    }
                    bj.cu(bc)
                } else {
                    if (cv == "mv") location.dispatch2("/mv?id=" + eD.mvid)
                }
                break;
            case "delete":
                bq.bKQ({
                    btnok: "确定",
                    btncc: "取消",
                    message: "确定删除歌曲？",
                    action: function(bz) {
                        if (bz == "ok") {
                            this.fK.oE({
                                pid: this.cO.cache.data.id,
                                trackIds: [bC]
                            })
                        }
                    }.bh(this)
                });
                break;
            default:
                this.bG("onaction", {
                    action: cv,
                    id: bC
                })
        }
    };
    bb.bGU = function(bc) {
        bc.value = '<div class="u-load s-fc4"><i class="icn"></i> 加载中...</div>';
        this.bG("onbeforelistload", bc)
    };
    bb.baa = function(bc) {
        bc.value = '<div class="n-nmusic"><h3 class="f-ff2"><i class="u-icn u-icn-21"></i>暂无音乐</h3></div>';
        this.bG("onemptylist", bc)
    };
    bb.OV = function(bc) {
        this.bG("onafterlistrender", bc)
    };
    bb.bIf = function(eD) {
        return bq.jC(eD) && eD.fee <= 0
    };
    bb.bJI = function(bc) {
        var bId = Fp.bP(this.bB, "ply-z-slt") || [],
            bvD = Fp.bw(bc.trackId + "" + Fp.St());
        bId.forEach(function(dB) {
            Fp.bR(dB, "ply-z-slt")
        });
        if (bvD) {
            Fp.bV(Fp.bP(bvD, "ply")[0], "ply-z-slt")
        }
    };
    bb.bIe = function(eD) {
        try {
            var oP = top.player.getPlaying();
            return oP.playing && oP.track.id == eD.id
        } catch (e) {}
    };
    bb.bam = function(eG) {
        if (this.fK) {
            var bk = this.fK.AX().hX(this.cO.cache.lkey) || [];
            return bq.bwp(bk, eG)
        }
    };
    bb.bIm = function() {
        if (this.fK) {
            var bk = this.fK.AX().hX(this.cO.cache.lkey) || [];
            for (var i = 0, ii; i < bk.length; i++) {
                ii = bk[i];
                if (ii.fee || bq.jC(ii)) return true
            }
        }
    };
    bb.bIi = function() {
        return this.fK
    };
    bb.bIc = function() {
        var bk = this.fK.AX().hX(this.cO.cache.lkey) || [],
            bn = [];
        for (var i = bk.length - 1, ii; i >= 0; i--) {
            ii = bk[i];
            if (!bq.jC(ii)) {
                bn.unshift(ii)
            }
        }
        return bn
    }
})();
(function() {
    var be = NEJ.P,
        bj = be("nej.v"),
        bK = be("nej.ut"),
        bp = be("nm.d"),
        bo = be("nm.l"),
        bm = be("nej.u"),
        bb, bJ;
    bp.gN({
        "comment-list": {
            url: "/api/v1/resource/comments/{rid}/",
            format: function(bHN, bf) {
                if (bHN.currentComment) {
                    this.ro("comment_cur-" + bf.data.rid, [bHN.currentComment])
                }
                if (bHN.hotComments) {
                    this.ro("comment_hot-" + bf.data.rid, bHN.hotComments)
                }
                if (/R_SO_(\d)_(\d+)/.test(bf.data.rid)) this.Vl(bHN.comments, RegExp.$2);
                return bHN.comments || []
            },
            finaly: function(bc) {
                bj.bG(bp.bLB, "listchange", bc)
            }
        },
        "comment-add": {
            url: "/api/resource/comments/add",
            format: function(bHN, bf) {
                bo.cq.bO({
                    tip: "评论成功"
                });
                return bHN.comment
            },
            finaly: function(bc) {
                bj.bG(bp.bLB, "listchange", bc)
            },
            onmessage: function(dU) {
                var eG = "评论失败";
                if (dU == 407) eG = "评论包含有关键字";
                else if (dU == 404) eG = "评论的资源已被删除";
                bo.cq.bO({
                    tip: eG,
                    type: 2
                })
            }
        },
        "comment-del": {
            url: "/api/resource/comments/delete",
            filter: function(hO, bQ) {
                if (hO.data.type == "hot") {
                    bQ.url = "/api/hotcomment/delete"
                } else if (hO.data.type == "admin") {
                    bQ.url = "/api/comment/delete"
                } else {
                    bQ.url = "/api/resource/comments/delete"
                }
            },
            format: function(bHN, bf) {
                var uc = this.hX("comment_hot-" + bf.data.threadId),
                    bu = bm.dY(uc, function(bt) {
                        return bt.commentId == bf.data.commentId
                    });
                if (bu != -1) {
                    uc.splice(bu, 1)
                }
                return this.fh(bf.data.commentId)
            },
            finaly: function(bc) {
                bj.bG(bp.bLB, "listchange", bc)
            },
            onmessage: function(dU) {
                bo.cq.bO({
                    tip: "评论删除失败",
                    type: 2
                })
            }
        },
        "comment-update": {
            url: "/api/v1/comment/like",
            filter: function(bf, bQ) {
                if (bf.data.like) {
                    bQ.url = "/api/v1/comment/like"
                } else {
                    bQ.url = "/api/v1/comment/unlike"
                }
            },
            format: function(bHN, bf) {
                var ub = this.fh(bf.data.commentId);
                ub.liked = bf.data.like;
                ub.likedCount = ub.likedCount || 0;
                ub.likedCount = ub.likedCount + (ub.liked ? 1 : -1);
                return ub
            },
            finaly: function(bc) {
                bc.action = "refresh";
                bj.bG(bp.bLB, "listchange", bc)
            },
            onmessage: function(dU) {
                bo.cq.bO({
                    tip: "操作失败",
                    type: 2
                })
            }
        },
        "comment-reply": {
            url: "/api/v1/resource/comments/reply",
            format: function(bHN, bf) {
                return bHN.comment
            },
            finaly: function(bc, bf) {
                bj.bG(bp.bLB, "listchange", bc);
                bo.cq.bO({
                    tip: "回复成功"
                })
            },
            onmessage: function(dU) {
                bo.cq.bO({
                    tip: "回复失败，请稍后再试",
                    type: 2
                })
            }
        }
    });
    bp.bLB = NEJ.C();
    bb = bp.bLB.bN(bp.gY);
    bb.dv = function() {
        this.dF();
        this.bwT = bp.qE.bL()
    };
    bb.cw = function(bf) {
        this.cA(bf)
    };
    bb.cX = function() {
        this.dc()
    };
    bb.Or = function(bf) {
        bf.onload = this.tZ.bh(this, bf);
        this.dg("comment-reply", bf)
    };
    bb.tZ = function(bf, bt) {
        bf.key = "comment-" + bf.data.threadId;
        var bc = this.xl(bf, bt);
        this.bG("onreply", bc);
        return bc
    };
    bb.Vl = function(bk, UU) {
        var bn = [];
        if (!bk || !bk.length) return;
        bm.bLt(bk, function(TI) {
            var bHN = {
                type: "song",
                cid: TI.commentId,
                sourceid: UU
            };
            bn.push({
                action: "commentimpress",
                json: bHN
            })
        }, this);
        this.bwT.bge(bn)
    };
    bK.hh.bL({
        element: bp.bLB,
        event: "listchange"
    })
})();
(function() {
    var be = NEJ.P,
        bZ = NEJ.O,
        co = NEJ.F,
        Fp = be("nej.e"),
        bj = be("nej.v"),
        bm = be("nej.u"),
        dE = be("nej.p"),
        cQ = be("nej.ui"),
        bH = be("nej.j"),
        bq = be("nm.x"),
        bp = be("nm.d"),
        bo = be("nm.l"),
        bEZ = be("nm.w"),
        fS = be("nm.ut"),
        bb, bJ;
    bEZ.rJ = NEJ.C();
    bb = bEZ.rJ.bN(cQ.ic);
    bJ = bEZ.rJ.du;
    bb.cw = function(bf) {
        this.cA(bf);
        this.dV = bf.type || 1;
        this.qM = bf.status;
        this.nO = bf.resource || {};
        this.Fd = Fp.tU(Fp.cV("m-wgt-input-" + this.dV, {
            placeholder: bf.placeholder || ""
        }));
        this.VV = bf.type == 2 ? true : false;
        var bk = Fp.bP(this.Fd, "j-flag");
        this.fd = bk[0];
        this.Oz = Fp.bP(this.Fd, "btns")[0];
        this.lP = bk[3];
        this.buX = bk[4];
        Fp.fm(this.fd, "holder");
        if (Fp.cJ(this.fd.parentNode, "holder-parent")) {
            Fp.bY(this.fd.parentNode, "display", "block")
        }
        this.fd.value = bf.input || "";
        this.bB.appendChild(this.Fd);
        this.kJ = {
            start: 0,
            end: 0
        };
        if (!bf.nomention) {
            this.gG = bEZ.AE.bL({
                parent: document.body,
                target: this.fd
            })
        } else {
            Fp.bY(bk[2], "display", "none")
        }
        this.OB = bf.numLimit || 140;
        this.gb();
        this.buY();
        this.dA([
            [this.lP, "click", this.Cf.bh(this)],
            [bk[2], "click", this.OE.bh(this)],
            [bk[1], "click", this.OF.bh(this)],
            [this.fd, "focus", this.kI.bh(this)],
            [this.fd, "input", this.is.bh(this)],
            [this.fd, "keyup", this.tG.bh(this)],
            [this.fd, "click", this.iO.bh(this)]
        ]);
        if (!bm.gj(bf.onbeforesubmit)) this.bs("onbeforesubmit", this.bva.bh(this));
        if (!bm.gj(bf.onloading)) this.bs("onloading", this.VQ.bh(this))
    };
    bb.cX = function() {
        this.fd.value = "";
        if (this.fR) {
            this.fR.ch();
            delete this.fR
        }
        if (this.gG) {
            this.gG.ch();
            delete this.gG
        }
        this.dc();
        Fp.fx(this.Fd)
    };
    bb.bva = function() {
        var bz = this.fd.value;
        if (this.lP.className.indexOf("dis") >= 0) return;
        if (!this.uN()) return;
        if (this.qM > 0) {
            bq.fE("由于版权保护，您所在的地区暂时无法评论。", this.nO.id, this.nO.type);
            return
        }
        if (bq.hN(bz)) {
            bo.cq.bO({
                type: 2,
                tip: "输入点内容再提交吧"
            });
            return
        }
        if (bm.lj(bz) > 2 * this.OB) {
            bo.cq.bO({
                type: 2,
                tip: "输入不能超过" + this.OB + "个字符"
            });
            return
        }
        return !0
    };
    bb.VQ = function() {
        Fp.bV(this.lP, "u-btn-1-dis");
        if (this.lP.innerText.indexOf("...") < 0) {
            this.lP.innerText = this.lP.innerText + "..."
        }
        this.uZ = !0
    };
    bb.qB = function() {
        if (!this.uZ) return;
        this.uZ = !1;
        Fp.bR(this.lP, "u-btn-1-dis");
        var fc = this.lP.innerText;
        this.lP.innerText = fc.substring(0, fc.length - 3)
    };
    bb.iO = function() {
        this.kJ = fS.ov(this.fd)
    };
    bb.Cf = function(bvc) {
        bj.cu(bvc);
        var bz = this.fd.value;
        if (!this.bG("onbeforesubmit", {
                value: bz
            })) return;
        if (this.dV != 4) this.bG("onloading");
        fS.YX(bz);
        if (this.gG) {
            this.gG.xu()
        }
        this.bG("onsubmit", bz);
        this.gb();
        return false
    };
    bb.xv = function() {
        this.fd.value = "";
        this.gb()
    };
    bb.fo = function() {
        return this.fd.value || ""
    };
    bb.jq = function() {
        var ck = this.fo().length;
        this.fd.focus();
        fS.HN(this.fd, {
            start: ck,
            end: ck
        });
        this.iO()
    };
    bb.OE = function(bc) {
        bj.cu(bc);
        if (this.qM > 0) {
            bq.fE("由于版权保护，您所在的地区暂时无法评论。", this.nO.id, this.nO.type);
            return
        }!!this.fR && this.fR.cj();
        this.gG.AB();
        this.gb()
    };
    bb.OF = function(bc) {
        bj.cu(bc);
        if (this.qM > 0) {
            bq.fE("由于版权保护，您所在的地区暂时无法评论。", this.nO.id, this.nO.type);
            return
        }
        if (!this.fR) {
            this.fR = bo.xt.bL({
                parent: this.Oz
            });
            this.fR.bs("onselect", this.qx.bh(this));
            Fp.bY(this.fR.kw().parentNode, "position", "relative")
        }
        this.fR.bO()
    };
    bb.qx = function(bc) {
        var ci = "[" + bc.text + "]";
        bj.bG(this.fd, "focus");
        this.fd.focus();
        fS.xk(this.fd, this.kJ, ci);
        this.gb();
        bj.bG(this.fd, "keyup")
    };
    bb.is = function(bc) {
        dE.dp.browser == "ie" && dE.dp.version < "7.0" ? setTimeout(this.gb.bh(this), 0) : this.gb()
    };
    bb.tG = function(bc) {
        this.iO();
        if (this.VV) this.bvf();
        this.is()
    };
    bb.uN = function() {
        if (!GUser || !GUser.userId || GUser.userId < 0) {
            top.login();
            return
        }
        return true
    };
    bb.kI = function() {
        if (!this.uN()) {
            this.fd.blur();
            return
        }
        if (this.qM > 0) {
            this.fd.blur();
            bq.fE("由于版权保护，您所在的地区暂时无法评论。", this.nO.id, this.nO.type);
            return
        }
    };
    bb.gb = function() {
        var ck = this.OB - Math.ceil(bm.lj(this.fd.value) / 2);
        this.buX.innerHTML = ck >= 0 ? ck : '<em class="s-fc6">' + ck + "</em>"
    };
    bb.bvf = function() {
        var VN = 76;
        var bvg = function() {
            if (parseInt(dT) > VN) {
                Fp.bY(this.fd, "height", "auto");
                Fp.bY(this.fd, "height", VN + "px");
                Fp.bY(this.fd, "overflowY", "scroll")
            } else {
                Fp.bY(this.fd, "height", "auto");
                Fp.bY(this.fd, "height", dT);
                Fp.bY(this.fd, "overflowY", "hidden")
            }
        }.bh(this);
        var bvi = function(string, number) {
            for (var i = 0, r = ""; i < number; i++) r += string;
            return r
        };
        this.xr.innerHTML = this.fd.value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/\n$/, "<br/>&nbsp;").replace(/\n/g, "<br/>").replace(/ {2,}/g, function(space) {
            return bvi("&nbsp;", space.length - 1) + " "
        }) + "&nbsp";
        var dT = this.xr.offsetHeight > this.VG ? this.xr.offsetHeight : this.VG;
        dT += "px";
        var bxT = Fp.bIU(this.fd, "height");
        setTimeout(bvg, 10)
    };
    bb.zz = function() {
        var mc = ["overflowX", "overflowY", "fontSize", "fontFamily", "lineHeight"];
        for (var i = 0; i < mc.length; i++) {
            Fp.bY(this.xr, mc[i], Fp.bIU(this.fd, mc[i]))
        }
        var eV = this.fd.offsetWidth - parseInt(Fp.bIU(this.fd, "paddingLeft")) - parseInt(Fp.bIU(this.fd, "paddingRight")) + "px";
        Fp.bY(this.xr, "width", eV)
    };
    bb.buY = function() {
        if (this.VV) {
            if (!Fp.bP(document.body, "shadow-textarea")[0]) {
                var fD = '<div style="position:absolute;border: none;left:-10000px;word-wrap: break-word;overflow: hidden;resize:none" class="shadow-textarea"></div>';
                var bid = Fp.tU(fD);
                document.body.appendChild(bid);
                this.xr = Fp.bP(document.body, "shadow-textarea")[0]
            } else {
                this.xr = Fp.bP(document.body, "shadow-textarea")[0]
            }
            this.VG = parseInt(Fp.bIU(this.fd, "height"));
            Fp.bY(this.fd, "overflow", "hidden");
            this.zz()
        }
    }
})();
(function() {
    var be = NEJ.P,
        bZ = NEJ.O,
        co = NEJ.F,
        Fp = be("nej.e"),
        bj = be("nej.v"),
        cQ = be("nej.ui"),
        bK = be("nej.ut"),
        bm = be("nej.u"),
        bq = be("nm.x"),
        bp = be("nm.d"),
        bEZ = be("nm.w"),
        bo = be("nm.l"),
        bb, bJ;
    bEZ.Cm = NEJ.C();
    bb = bEZ.Cm.bN(cQ.ic);
    bJ = bEZ.Cm.du;
    bb.dv = function() {
        this.cO = {
            limit: 20,
            parent: null,
            item: {
                klass: "m-wgt-comment-item",
                timeformat: bq.pa,
                getRichText: bq.rF,
                escape: this.bvs,
                getAuthIcon: bq.bjR,
                getPlayCount: bq.bMA
            },
            pager: {
                parent: null,
                clazz: "u-page"
            },
            cache: {
                clear: true,
                lkey: "comment",
                key: "commentId",
                data: {},
                klass: bp.bLB,
                onerror: this.bvP.bh(this)
            },
            onbeforelistload: function(bc) {
                bc.value = '<div class="u-load s-fc4"><i class="icn"></i> 加载中...</div>'
            },
            onemptylist: function(bc) {
                bc.stopped = !0
            },
            onafterlistrender: this.OV.bh(this)
        };
        this.eB = {
            placeholder: "评论",
            parent: null,
            onsubmit: this.bvR.bh(this)
        };
        this.dF()
    };
    bb.bFa = function() {
        this.bLu()
    };
    bb.cw = function(bf) {
        this.cA(bf);
        this.bA = bp.bLB.bL({
            key: "commentId",
            onreply: this.Cn.bh(this),
            onerror: this.bvS.bh(this)
        });
        this.nO = bq.bjS(bf.commentThreadId) || {};
        this.qM = bf.status;
        if (bf.status !== undefined) this.eB.status = bf.status;
        this.eB.resource = this.nO;
        this.xn = bEZ.rJ.bL(this.eB);
        var cC = bm.mk(location.search.slice(1));
        if (cC.commentId) {
            this.cO.cache.data.commentId = cC.commentId
        }
        this.cO.item.resUserId = bf.resourceUserId;
        this.cO.cache.data.rid = bf.commentThreadId;
        this.cO.cache.lkey = "comment-" + bf.commentThreadId;
        this.cO.cache.total = bf.commentCount || 0;
        if (!!this.ef) this.ef.ch();
        this.ef = bK.hr.bL(this.cO);
        this.dA([
            [this.bB, "click", this.dC.bh(this)],
            [bp.bLB, "listchange", this.Cq.bh(this)]
        ])
    };
    bb.cX = function() {
        this.dc();
        this.xn.ch();
        if (this.ef) {
            this.ef.ch();
            delete this.ef
        }
    };
    bb.bvs = function(ci) {
        return bm.eZ((ci || "").replace(/\s{2,}/g, " ").trim())
    };
    bb.uN = function() {
        if (GUser && GUser.userId > 0) {
            return !0
        } else {
            top.login();
            return !1
        }
    };
    bb.FE = NEJ.F;
    bb.Cq = function(bc) {
        var df = this.ef.kN();
        if (this.nJ) this.nJ.innerText = df;
        switch (bc.action) {
            case "reply":
            case "add":
                this.xn.xv();
                this.xn.qB();
                this.bG("onadd", {
                    total: Math.max(df, 0)
                });
                this.FE(df);
                break;
            case "delete":
                this.bG("ondelete", {
                    total: Math.max(df, 0)
                });
                this.FE(df);
                break;
            case "update":
                break
        }
    };
    bb.gL = function(bC, bFq) {
        if (!this.uN()) return;
        if (!!this.lz) {
            this.lz.input.ch();
            if (this.lz.attachId == bC) {
                delete this.lz;
                return
            }
        }
        this.lz = {
            attachId: bC,
            wrapper: Fp.gH("div")
        };
        var bl = this.bA.fh(bC);
        bFq.insertAdjacentElement("afterEnd", this.lz.wrapper);
        this.lz.input = bEZ.rJ.bL({
            input: "回复" + bl.user.nickname + ":",
            parent: this.lz.wrapper,
            type: 2,
            onsubmit: this.bvT.bh(this, bC),
            onbeforesubmit: function(bc) {
                var bz = bc.value,
                    kZ = bz.indexOf(":"),
                    bX = bz.substring(0, kZ),
                    ci = bz.substring(kZ + 1);
                if (bX == "回复" + bl.user.nickname) {
                    if (bq.hN(ci)) {
                        bo.cq.bO({
                            type: "2",
                            tip: "输入点内容再提交吧"
                        });
                        return false
                    }
                } else if (bq.hN(bz)) {
                    bo.cq.bO({
                        type: "2",
                        tip: "输入点内容再提交吧"
                    });
                    return false
                }
                if (bm.lj(bz) > 2 * 140) {
                    bo.cq.bO({
                        type: "2",
                        tip: "输入不能超过140个字符"
                    });
                    return false
                }
                return true
            }
        });
        this.lz.input.jq()
    };
    bb.bvT = function(bC, bz) {
        var bl = this.bA.fh(bC),
            kZ = bz.indexOf(":"),
            bX = bz.substring(0, kZ),
            ci = bz.substring(kZ + 1);
        if (bX == "回复" + bl.user.nickname) {
            this.bA.Or({
                key: "comment",
                data: {
                    commentId: bC,
                    threadId: this.cO.cache.data.rid,
                    content: ci
                },
                ext: {
                    index: this.ef.biR().ph()
                }
            })
        } else {
            this.ef.AY({
                threadId: this.cO.cache.data.rid,
                content: bz
            })
        }
    };
    bb.Cn = function(bc) {
        this.lz.input.qB();
        this.lz.input.ch();
        Fp.fx(this.lz.wrapper);
        delete this.lz
    };
    bb.bvU = function(bC) {
        bq.bKQ({
            btnok: "确定",
            btncc: "取消",
            message: "确定删除评论？",
            action: function(bz) {
                if (bz == "ok") {
                    this.ef.oE({
                        commentId: bC,
                        threadId: this.cO.cache.data.rid
                    })
                }
            }.bh(this)
        })
    };
    bb.bFp = function(bC) {
        bq.bKQ({
            btnok: "确定",
            btncc: "取消",
            message: "确定移除精彩评论？",
            action: function(bz) {
                if (bz == "ok") {
                    this.ef.oE({
                        type: "hot",
                        commentId: bC,
                        threadId: this.cO.cache.data.rid
                    })
                }
            }.bh(this)
        })
    };
    bb.dC = function(bc) {
        var bid = bj.cf(bc, "d:type"),
            bDM = Fp.bI(bid, "type"),
            bC = Fp.bI(bid, "id");
        this.bG("onclick", bc);
        if (bc.stoped) return;
        switch (bDM) {
            case "reply":
                if (this.qM > 0) {
                    bq.fE("由于版权保护，您所在的地区暂时无法评论。", this.nO.id, this.nO.type);
                    break
                }
                this.gL(bC, bj.cf(bc, "c:itm"));
                bj.cu(bc);
                break;
            case "delete":
                this.bvU(bC);
                break;
            case "unlike":
            case "like":
                if (!this.uN()) return;
                if (this.ef) {
                    this.ef.lO({
                        commentId: bC,
                        threadId: this.cO.cache.data.rid,
                        like: bDM == "like"
                    })
                }
                break;
            case "reject":
                this.bFp(bC);
                break;
            case "admindelete":
                bq.bKQ({
                    btnok: "确定",
                    btncc: "取消",
                    message: "确定删除评论？",
                    action: function(bz) {
                        if (bz == "ok") {
                            this.ef.oE({
                                type: "admin",
                                commentId: bC,
                                threadId: this.cO.cache.data.rid
                            })
                        }
                    }.bh(this)
                });
                break
        }
    };
    bb.bvR = function(bz) {
        if (!this.uN() || bq.hN(bz)) return;
        this.ef.AY({
            threadId: this.cO.cache.data.rid,
            content: bz
        })
    };
    bb.bvP = function() {
        this.xn.qB()
    };
    bb.bvS = function() {
        if (this.lz) this.lz.input.qB()
    };
    bb.jq = function() {
        Fp.oY(this.gB);
        this.xn.jq()
    };
    bb.OV = function(bc) {
        if (bc.offset == 0) {
            var jW, fD = "",
                hm = '<h3 class="u-hd4">{title}({count})</h3>',
                bFI = this.bA.hX("comment_cur-" + this.cO.cache.data.rid),
                uc = this.bA.hX("comment_hot-" + this.cO.cache.data.rid);
            if (bFI.length || uc.length || this.cO.cache.data.commentId) {
                if (bFI.length) {
                    jW = {
                        beg: 0,
                        end: bFI.length - 1,
                        xlist: bFI
                    };
                    fD = '<h3 class="u-hd4">当前评论</h3>' + Fp.cV(this.cO.item.klass, NEJ.X(jW, this.cO.item)) + "<br>";
                    Fp.oY(this.bB)
                } else if (this.cO.cache.data.commentId) {
                    fD = '<h3 class="u-hd4">当前评论</h3><div class="m-dlist"><div class="src src-empty f-cb"><span class="s-fc4">该评论已删除</span></div></div><br>';
                    Fp.oY(this.bB)
                }
                if (uc.length) {
                    jW = {
                        beg: 0,
                        end: uc.length - 1,
                        xlist: uc,
                        hot: true
                    };
                    fD = fD + bq.Cb(hm, {
                        count: uc.length,
                        title: "精彩评论"
                    }) + Fp.cV(this.cO.item.klass, NEJ.X(jW, this.cO.item)) + "<br>"
                }
                bc.parent.insertAdjacentHTML("afterBegin", fD + "<br>" + bq.Cb(hm, {
                    count: this.ef.kN(),
                    title: "最新评论"
                }))
            } else {
                bc.parent.insertAdjacentHTML("afterBegin", bq.Cb(hm, {
                    count: this.ef.kN(),
                    title: "最新评论"
                }))
            }
        }
    }
})();
(function() {
    var be = NEJ.P,
        bZ = NEJ.O,
        co = NEJ.F,
        Fp = be("nej.e"),
        bj = be("nej.v"),
        cQ = be("nej.ui"),
        bK = be("nej.ut"),
        bm = be("nej.u"),
        bq = be("nm.x"),
        bp = be("nm.d"),
        bEZ = be("nm.w"),
        bb, bJ;
    bEZ.rA = NEJ.C();
    bb = bEZ.rA.bN(bEZ.Cm);
    bJ = bEZ.rA.du;
    bb.dv = function() {
        this.dF()
    };
    bb.bFa = function() {
        this.bLu();
        var bk = Fp.bP(this.bB, "j-flag");
        this.nJ = bk[0];
        this.eB.parent = bk[1];
        this.cO.parent = bk[2];
        this.cO.pager.parent = bk[3]
    };
    bb.bLv = function() {
        this.dn = "m-wgt-comment"
    };
    bb.cw = function(bf) {
        this.cA(bf);
        this.nJ.innerText = bf.commentCount || 0
    }
})();
(function() {
    var be = NEJ.P,
        eL = window,
        Fp = be("nej.e"),
        bj = be("nej.v"),
        bK = be("nej.ut"),
        bH = be("nej.j"),
        bm = be("nej.u"),
        bo = be("nm.l"),
        Pk = be("nm.m.c"),
        bp = be("nm.d"),
        bq = be("nm.x"),
        bEZ = be("nm.w"),
        bM = be("nm.m"),
        bE = be("nm.m.f"),
        bb, bJ;
    Pk.Vo = NEJ.C();
    bb = Pk.Vo.bN(bM.dM);
    bb.cE = function() {
        this.cL();
        this.brf = Fp.bw("content-operation");
        this.bIj = Fp.bw("play-count");
        this.ij = Fp.bw("comment-box");
        try {
            this.nG = Fp.bP(this.brf, "u-btni-fav")[0];
            this.AP = Fp.bP(this.brf, "u-btni-share")[0]
        } catch (e) {}
        this.gx = Fp.bI(this.brf, "rid");
        this.dV = Fp.bI(this.brf, "type");
        var bHF = Fp.bw("song-list-pre-cache");
        if (bHF) {
            this.bHD = bEZ.bHI.bL({
                type: Fp.bI(this.brf, "special") == 10 ? "rank" : "",
                tpl: this.dV == 2 ? "m-wgt-song-top50-list" : "",
                parent: bHF,
                key: bq.bHQ(bHF),
                canDel: this.dV == 13 && Fp.bI(this.brf, "ishost"),
                data: {
                    id: this.gx
                }
            })
        }
        if (this.dV == 13) {
            this.bA = bp.fY.bL({
                onitemadd: this.oH.gz(this, "success"),
                onerror: this.oH.gz(this, "error")
            });
            bj.bs(bp.fY, "playcountchange", this.Vb.bh(this));
            bj.bs(bp.fY, "itemchange", this.bIb.bh(this))
        } else if (Fp.bw("artist-name")) {
            var pm = Fp.bw("artist-name"),
                FY = Fp.bw("artist-alias"),
                bvY = Fp.bw("artist-home"),
                wX = pm.parentNode.clientWidth - (bvY ? 150 : 0);
            if (pm.clientWidth > wX) {
                pm.style.width = wX + "px";
                Fp.bV(FY, "f-hide")
            } else {
                wX = wX - pm.clientWidth - 15;
                if (FY && FY.clientWidth > wX) {
                    FY.style.width = wX + "px"
                }
            }
            this.Gb = Fp.bw("artist-sub");
            this.Vi = bp.ue.bL();
            bj.bs(this.Gb, "click", this.bvZ.bh(this));
            bj.bs(bp.ue, "itemchange", this.bwc.bh(this));
            this.dV = this.dV || 2;
            this.gx = this.gx || Fp.bI("artist-name", "rid")
        }
        if (this.ij) {
            this.oq = bEZ.rA.bL({
                status: this.bon() ? 1 : 0,
                parent: this.ij,
                commentThreadId: Fp.bI(this.ij, "tid"),
                resourceUserId: Fp.bI(this.ij, "uid"),
                commentCount: Fp.bI(this.ij, "count"),
                onadd: this.lA.bh(this),
                ondelete: this.lA.bh(this)
            })
        }
        this.dA([
            [this.brf, "click", this.bIa.bh(this)],
            [document.body, "click", this.gI.bh(this)],
            [Fp.bw("album-desc-spread"), "click", this.bws.bh(this)],
            [eL, "share", this.PR.bh(this)]
        ]);
        this.bxa()
    };
    bb.bwo = function() {
        if (!this.wP()) {
            bq.fE("由于版权保护，您所在的地区暂时无法使用。", this.gx, this.dV);
            return
        }
        if (typeof GUser !== "undefined" && !GUser.userId) {
            top.login();
            return
        }
        var bC = this.gx || "";
        if (this.nG.className.indexOf("fav-dis") >= 0) return;
        var dm = parseInt(this.nG.innerText.replace(/\D/g, ""));
        if (this.dV == "13" || this.dV == 17) {
            Fp.bV(this.nG, "u-btni-fav-dis");
            this.nG.innerHTML = "<i>收藏中...</i>";
            this.bA.jo({
                key: (this.dV == 13 ? "playlist_fav-" : "program_fav-") + GUser.userId,
                data: {
                    id: bC,
                    subscribedCount: dm
                }
            });
            return
        }
        if (!!this.bwG) this.bwG.ch();
        var hM = {
            tracks: [bC]
        };
        var bX = Fp.bI(this.nG, "name");
        if (bX) {
            hM.name = bX;
            hM.tracks = this.bwu()
        }
        bq.iE(hM)
    };
    bb.oH = function(bc, bDM) {
        Fp.bI(this.nG, "count", bc.ext.subscribedCount);
        if (bDM == "success") {
            this.nG.innerHTML = bq.bMX(bq.bMA(bc.ext.subscribedCount), "已收藏")
        } else {
            this.nG.innerHTML = bq.bMX(bq.bMA(bc.ext.subscribedCount), "收藏");
            Fp.bR(this.nG, "u-btni-fav-dis")
        }
    };
    bb.PR = function(bc) {
        if (this.dV == "18" || !this.dV || bc.rtype == 18) return;
        var dm = parseInt(Fp.bI(this.AP, "count"));
        Fp.bI(this.AP, "count", ++dm);
        this.AP.innerHTML = bq.bMX(bq.bMA(dm), "分享")
    };
    bb.Vb = function() {
        var dm = parseInt(this.bHZ.innerText) || 0;
        this.bHZ.innerText = dm + 1
    };
    bb.bIa = function(bc) {
        var bid = bj.cf(bc, "d:resAction"),
            cv = Fp.bI(bid, "resAction"),
            bDM = Fp.bI(bid, "resType"),
            bC = Fp.bI(bid, "resId");
        switch (cv) {
            case "play":
            case "addto":
            case "share":
            case "comment":
            case "fav":
            case "download":
                if (["share", "fav"].indexOf(cv) != -1 && !bq.uH()) return;
                if (this.bon(true)) {
                    bj.cu(bc)
                } else {
                    if (cv == "comment" && this.oq) {
                        this.oq.jq()
                    }
                    if (cv == "fav") {
                        switch (parseInt(bDM)) {
                            case 13:
                                if (this.nG.className.indexOf("dis") > 0) break;
                                var dm = parseInt(Fp.bI(this.nG, "count"));
                                Fp.bV(this.nG, "u-btni-fav-dis");
                                this.nG.innerHTML = "<i>收藏中...</i>";
                                this.bA.jo({
                                    key: "playlist_fav-" + GUser.userId,
                                    data: {
                                        id: bC,
                                        subscribedCount: dm
                                    }
                                });
                                break;
                            case 2:
                            case 19:
                                var bX = Fp.bI(bid, "resName");
                                bq.iE({
                                    name: bX,
                                    tracks: this.bHD.bIc()
                                });
                                break
                        }
                    }
                }
                break
        }
    };
    bb.gI = function(bc) {
        var bid = bj.cf(bc, "d:action");
        switch (Fp.bI(bid, "action")) {
            case "rttip":
                bq.fE("由于版权保护，您所在的地区暂时无法使用。");
                break;
            case "outchain":
                var bwd = this.bHD && this.bHD.bIm();
                if (this.dV == 18) {
                    bwd = Fp.bI(this.nG, "fee") > 0 || Fp.bI(this.nG, "status") < 0 || this.bon()
                }
                if (bwd || Fp.bI(bid, "rt")) {
                    bq.fE("由于版权保护，无法生成外链。")
                } else {
                    location.dispatch2(Fp.bI(bid, "href"))
                }
                break;
            case "tomigu":
                bH.cR("/api/song/migu/url", {
                    type: "json",
                    sync: true,
                    timeout: 3e3,
                    query: {
                        clientType: "web",
                        id: this.gx
                    },
                    onload: function(bc) {
                        if (bc.code == 200) {
                            window.open(bc.webUrl)
                        }
                    }
                });
                break
        }
    };
    bb.lA = function(bc) {
        var bid = Fp.bw("cnt_comment_count");
        if (bid) bid.innerText = bc.total
    };
    bb.bws = function(bc) {
        bj.cu(bc);
        if (Fp.cJ("album-desc-dot", "f-hide")) {
            Fp.bR("album-desc-dot", "f-hide");
            Fp.bw("album-desc-spread").innerHTML = '展开<i class="u-icn u-icn-69"></i>';
            Fp.bV("album-desc-more", "f-hide")
        } else {
            Fp.bV("album-desc-dot", "f-hide");
            Fp.bw("album-desc-spread").innerHTML = '收起<i class="u-icn u-icn-70"></i>';
            Fp.bR("album-desc-more", "f-hide")
        }
    };
    bb.bvZ = function(bc) {
        if (typeof GUser !== "undefined" && !GUser.userId) {
            top.login();
            return
        }
        if (!Fp.cJ(this.Gb, "btnfav-0")) {
            this.Vi.jo({
                key: "artist_sub",
                data: {
                    artistId: this.gx
                }
            })
        } else {
            this.Vi.Ae({
                key: "artist_sub",
                data: {
                    artistId: this.gx
                }
            })
        }
    };
    bb.bwc = function(bc) {
        if (this.gx != bc.id) return;
        if (bc.subscribed) {
            Fp.bV(this.Gb, "btnfav-0")
        } else {
            Fp.bR(this.Gb, "btnfav-0")
        }
    };
    bb.bxa = function() {
        var cC = bm.mk(location.search.slice(1)),
            BN = cC.autoplay;
        if (BN) {
            top.player.play(parseInt(this.dV), cC.id)
        }
    };
    bb.bIb = function(bc) {
        var zr = Fp.bw("playlist-track-count");
        if (zr) {
            var dm = parseInt(zr.innerText);
            if (bc.cmd == "add") {
                zr.innerText = dm + 1
            } else if (bc.cmd == "del") {
                zr.innerText = dm - 1
            }
        }
    };
    bb.bon = function(eG) {
        if (this.dV == 18) {
            var bHM = {
                id: Fp.bI(this.nG, "resId"),
                fee: Fp.bI(this.nG, "fee"),
                status: Fp.bI(this.nG, "status"),
                copyrightId: Fp.bI(this.nG, "copyrightId")
            };
            if (bq.jC(bHM)) {
                if (bHM.fee > 0) {
                    if (eG) bq.bHG(bHM.fee, bHM.id, "song");
                    return bHM
                } else {
                    if (eG) bq.bHH();
                    return true
                }
            }
        } else {
            return this.bHD ? this.bHD.bam(eG) : null
        }
    };
    Fp.dN("template-box");
    new Pk.Vo
})();
(function() {
    var be = NEJ.P,
        Fp = be("nej.e"),
        bj = be("nej.v"),
        bm = be("nej.u"),
        fS = be("nm.ut");
    fS.bFm = function() {
        var bFf = function(cK, eh, tY, ud, bFc) {
            if (tY < ud) {
                var bFd = Math.floor((tY + ud) / 2);
                bFf(cK, eh, tY, bFd, bFc);
                bFf(cK, eh, bFd + 1, ud, bFc);
                bFl(cK, eh, tY, bFd, ud, bFc)
            }
        };
        var bFl = function(cK, eh, tY, bFd, ud, bFc) {
            var i = tY,
                j = bFd + 1,
                k = tY;
            while (i <= bFd && j <= ud) {
                if (bFc(cK[i], cK[j]) <= 0) {
                    eh[k++] = cK[i++]
                } else {
                    eh[k++] = cK[j++]
                }
            }
            while (i <= bFd) {
                eh[k++] = cK[i++]
            }
            while (j <= ud) {
                eh[k++] = cK[j++]
            }
            for (i = tY; i <= ud; i++) {
                cK[i] = eh[i]
            }
        };
        var bFk = function(ox, bFj) {
            return ox < bFj
        };
        return function(cK, bFc) {
            if (!cK || cK.length == 0) return cK;
            bFc = bFc || bFk;
            bFf(cK, new Array(cK.length), 0, cK.length - 1, bFc);
            return cK
        }
    }();
    fS.bEO = function() {
        var fg = /\r\n|\r|\n/,
            hy = /\[(.*?)\]/gi,
            II = {
                ar: "artist",
                ti: "track",
                al: "album",
                offset: "offset"
            };
        var IH = function(bn, iD) {
            var cK = [];
            iD = iD.replace(hy, function($1, $2) {
                var cr = IF.call(this, bn, $2);
                if (cr != null) {
                    cK.push({
                        time: cr,
                        tag: $2
                    });
                    bn.scrollable = !0
                }
                return ""
            }.bh(this)).trim();
            if (!cK.length) {
                if (!iD || iD.length == 0) return;
                cK.push({
                    time: -1
                })
            }
            bm.bLt(cK, function(bt) {
                bt.lyric = iD
            });
            var ps = bn.lines;
            ps.push.apply(ps, cK)
        };
        var IF = function(bn, cr) {
            var cK = cr.split(":"),
                oO = cK.shift(),
                bF = II[oO];
            if (!!bF) {
                bn[bF] = cK.join(":");
                return null
            }
            oO = parseInt(oO);
            if (isNaN(oO)) {
                return null
            } else {
                var cl = parseInt(bn.offset) || 0;
                return oO * 60 + parseFloat(cK.join(".")) + cl / 1e3
            }
        };
        var SL = function(SD, SC) {
            return SD.time - SC.time
        };
        return function(bC, ci) {
            var bn = {
                id: bC,
                lines: [],
                scrollable: !1,
                source: ci
            };
            bm.bLt((ci || "").trim().split(fg), IH.bh(null, bn));
            if (bn.scrollable) {
                fS.bFm(bn.lines, SL);
                var bu;
                for (var i = 0; i < bn.lines.length; i++) {
                    if (!!bn.lines[i].lyric) {
                        bu = i;
                        break
                    }
                }
                bn.lines.splice(0, bu)
            }
            return bn
        }
    }();
    fS.bET = function(bDu, bEI) {
        var bEP = fS.bEO(0, bDu),
            bEQ = fS.bEO(0, bEI);
        if (bEP.scrollable && bEQ.scrollable) {
            bm.bLt(bEP.lines, function(bt) {
                var bES = getTranslate(bt.time);
                if (bES) {
                    bt.lyric = bt.lyric + "<br>" + bES.lyric
                }
            })
        }
        return bEP;

        function getTranslate(cr) {
            var bu = bm.dY(bEQ.lines, function(bt) {
                return bt.time == cr
            });
            if (bu != -1) {
                return bEQ.lines[bu]
            }
        }
    }
})();
(function() {
    var be = NEJ.P,
        bZ = NEJ.O,
        co = NEJ.F,
        Fp = be("nej.e"),
        bj = be("nej.v"),
        bH = be("nej.j"),
        bm = be("nej.u"),
        bq = be("nm.x"),
        bo = be("nm.l"),
        bp = be("nm.d");
    var bEa = function(bl) {
        if (bl.errorType == 6 || bl.errorType == 7 || bl.errorType == 8) {
            if (!bq.uH()) return;
            bq.vE({
                txt: "m-report-point",
                title: "提示",
                onaction: bEb.bh(this, bl)
            })
        } else {
            bEb(bl)
        }
    };
    var bEq = function(bc) {
        var bid = bj.cf(bc, "d:action");
        if (Fp.bI(bid, "action") == "feedLyric") {
            bj.cu(bc);
            var dU = Fp.bI(bid, "code"),
                bl = {
                    songId: Fp.bI(bid, "id"),
                    errorType: dU
                };
            bEa(bl)
        }
    };
    var bEb = function(bl, bc) {
        if (!bc || bc.action == "ok") {
            bH.cR("/api/v1/feedback/lyric", {
                type: "json",
                method: "post",
                data: bm.eK(bl),
                onload: function(bc) {
                    if (bc.code == 200) {
                        bo.cq.bO({
                            tip: "提交成功"
                        });
                        if (bm.gj(bl.onok)) {
                            bl.onok()
                        }
                    } else if (bc.code == -2) {
                        bq.bKQ({
                            title: "提示",
                            message: "您的积分不足",
                            btnok: "赚积分",
                            action: function(cv) {
                                if (cv == "ok") {
                                    location.dispatch2("/store/gain/index")
                                }
                            }
                        })
                    } else {
                        bo.cq.bO({
                            type: 2,
                            tip: "提交失败"
                        })
                    }
                }
            })
        }
    };
    bq.bEc = function(bid) {
        bj.bs(bid || document.body, "click", bEq.bh(this))
    };
    bq.bEB = function(bl) {
        bEa(bl)
    }
})();
(function() {
    var be = NEJ.P,
        bZ = NEJ.O,
        Fp = be("nej.e"),
        bj = be("nej.v"),
        bm = be("nej.u"),
        bK = be("nej.ut"),
        bH = be("nej.j"),
        eb = be("nm.ut"),
        bM = be("nm.m"),
        bp = be("nm.d"),
        bq = be("nm.x"),
        bE = be("nm.s"),
        bo = be("nm.l"),
        bb, bJ;
    bE.Tp = NEJ.C();
    bb = bE.Tp.bN(bK.bFb);
    bb.cE = function() {
        bj.bs(document.body, "click", this.gI.bh(this));
        var cg = "/api/song/lyric",
            cC = {
                id: Fp.bI("lyric-content", "songId"),
                lv: -1,
                tv: -1
            };
        this.bjH = cC.id;
        bH.cR(cg, {
            sync: false,
            type: "json",
            query: cC,
            method: "get",
            onload: this.bER.bh(this),
            onerror: this.bER.bh(this)
        });
        bq.bEc()
    };
    bb.bkC = function() {
        var Sb = Fp.bw("flag_more");
        if (Fp.cJ(Sb, "f-hide")) {
            Fp.bR(Sb, "f-hide");
            Fp.bw("flag_ctrl").innerHTML = '收起<i class="u-icn u-icn-70"></i>'
        } else {
            Fp.bV(Sb, "f-hide");
            Fp.bw("flag_ctrl").innerHTML = '展开<i class="u-icn u-icn-69"></i>'
        }
    };
    bb.gI = function(bc) {
        var bid = bj.cf(bc, "action");
        switch (Fp.bI(bid, "action")) {
            case "loginlink":
                if (!bq.uH()) return;
                location.dispatch2(Fp.bI(bid, "href"))
        }
    };
    bb.bER = function(bc) {
        var bDu = bc.lrc || {},
            bEI = bc.tlyric || {},
            bid = Fp.bw("lyric-content");
        this.gQ = eb.bET(bDu.lyric, bEI.lyric);
        Fp.ne(bid, "m-lyric-content", {
            id: this.bjH,
            nolyric: bc.nolyric,
            limit: bEI.lyric ? 6 : 13,
            lines: this.gQ.lines,
            thirdCopy: Fp.bI(bid, "thirdCopy") == "true",
            copyFrom: Fp.bI(bid, "copyFrom")
        });
        bc.scrollable = this.gQ.scrollable;
        bc.songId = this.bjH;
        Fp.ne("user-operation", "m-user-operation", bc);
        bj.bs("flag_ctrl", "click", this.bkC.bh(this))
    };
    new bE.Tp
})()