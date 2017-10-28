"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouterProxy {
    createProxy(targetCallback, exceptionsHandler) {
        return (req, res, next) => {
            try {
                Promise.resolve(targetCallback(req, res, next))
                    .catch((e) => {
                    exceptionsHandler.next(e, res);
                });
            }
            catch (e) {
                exceptionsHandler.next(e, res);
            }
        };
    }
    createExceptionLayerProxy(targetCallback, exceptionsHandler) {
        return (err, req, res, next) => {
            try {
                Promise.resolve(targetCallback(err, req, res, next))
                    .catch((e) => {
                    exceptionsHandler.next(e, res);
                });
            }
            catch (e) {
                exceptionsHandler.next(e, res);
            }
        };
    }
}
exports.RouterProxy = RouterProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLXByb3h5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcm91dGVyL3JvdXRlci1wcm94eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBO0lBQ1csV0FBVyxDQUNkLGNBQW1DLEVBQ25DLGlCQUFvQztRQUVwQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQztnQkFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUMxQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtvQkFDVCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsQ0FBQztZQUNYLENBQUM7WUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNQLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkMsQ0FBQztRQUNMLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFTSx5QkFBeUIsQ0FDNUIsY0FBNkMsRUFDN0MsaUJBQW9DO1FBRXBDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzNCLElBQUksQ0FBQztnQkFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDL0MsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ1QsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUM7WUFDWCxDQUFDO1lBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDUCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLENBQUM7UUFDTCxDQUFDLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFsQ0Qsa0NBa0NDIn0=